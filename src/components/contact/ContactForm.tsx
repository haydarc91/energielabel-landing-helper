import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enUS } from 'date-fns/locale';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { sendWebhook } from '@/utils/sendWebhook';

const ContactForm = () => {
  const { toast } = useToast();
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [propertyInfo, setPropertyInfo] = useState<any>(null);
  const [isRushService, setIsRushService] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Naam moet minimaal 2 karakters lang zijn.",
    }),
    email: z.string().email({
      message: "Voer een geldig e-mailadres in.",
    }),
    phone: z.string()
      .min(10, { message: "Telefoonnummer moet minimaal 10 cijfers bevatten." })
      .max(10, { message: "Telefoonnummer mag maximaal 10 cijfers bevatten." })
      .regex(/^[0-9]+$/, { message: "Alleen cijfers zijn toegestaan." }),
    address: z.string().optional(),
    propertyType: z.string().optional(),
    surfaceArea: z.string().optional(),
    message: z.string().optional(),
    postcode: z.string().optional(),
    houseNumber: z.string().optional(),
    houseNumberAddition: z.string().optional(),
    time: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      surfaceArea: "",
      message: "",
      postcode: "",
      houseNumber: "",
      houseNumberAddition: "",
    },
  });

  useEffect(() => {
    const storedPropertyInfo = localStorage.getItem('propertyInfo');
    if (storedPropertyInfo) {
      const parsedInfo = JSON.parse(storedPropertyInfo);
      setPropertyInfo(parsedInfo);
      
      form.setValue('address', parsedInfo.address || '');
      form.setValue('postcode', parsedInfo.postcode || '');
      form.setValue('houseNumber', parsedInfo.houseNumber || '');
      form.setValue('houseNumberAddition', parsedInfo.houseNumberAddition || '');
      form.setValue('propertyType', parsedInfo.propertyType || '');
      form.setValue('surfaceArea', parsedInfo.surfaceArea ? parsedInfo.surfaceArea.toString() : '');
      
      calculatePrice(parsedInfo.surfaceArea);
    }
  }, [form.setValue]);

  const calculatePrice = (surfaceArea: number | undefined) => {
    if (surfaceArea) {
      let basePrice = Math.max(285, Math.round(surfaceArea * 2.3));
      if (isRushService) {
        basePrice += 75; // Add rush service fee
      }
      setCalculatedPrice(basePrice);
    } else {
      setCalculatedPrice(isRushService ? 360 : 285);
    }
  };

  const handleRushServiceChange = (checked: boolean) => {
    setIsRushService(checked);
    calculatePrice(propertyInfo?.surfaceArea);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const submissionData = {
      ...values,
      propertyType: propertyInfo?.propertyType || values.propertyType,
      surfaceArea: propertyInfo?.surfaceArea || values.surfaceArea,
      calculatedPrice: calculatedPrice,
      rushService: isRushService,
      appointmentDate: date ? format(date, 'yyyy-MM-dd', { locale: enUS }) : null,
      appointmentTime: time || null,
    };
      
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: values.email,
          cc: 'info@epawoninglabel.nl',
          subject: 'Nieuwe aanvraag energielabel',
          content: `Nieuwe aanvraag van ${values.name} (${values.email})`,
          ...submissionData,
        }),
      });
      
      if (!response.ok) {
        console.error('Error sending email:', response.status);
      }
      
      const success = await sendWebhook(submissionData);
      
      if (!success) {
        toast({
          title: "Fout bij verzenden aanvraag",
          description: "Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het later nogmaals.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Aanvraag succesvol verzonden!",
        description: "Dank voor uw aanvraag. Er wordt binnen 4 uur contact met u opgenomen.",
        variant: "default",
        duration: 5000,
      });
      
      form.reset();
      setCalculatedPrice(null);
      localStorage.removeItem('propertyInfo');
      setPropertyInfo(null);
      setIsRushService(false);
      setDate(undefined);
      setTime("");
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Fout bij verzenden aanvraag",
        description: "Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het later nogmaals.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input placeholder="Uw volledige naam" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mailadres</FormLabel>
                  <FormControl>
                    <Input placeholder="voorbeeld@email.nl" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefoonnummer</FormLabel>
                <FormControl>
                  <Input placeholder="0851234567" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Straatnaam 123" 
                      {...field} 
                      className="bg-white" 
                      disabled={!!propertyInfo?.address}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type woning</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Vrijstaand, appartement, etc." 
                      {...field} 
                      className="bg-white" 
                      disabled={!!propertyInfo?.propertyType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="surfaceArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Woonoppervlakte (m²)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="50" 
                    {...field} 
                    type="number"
                    className="bg-white" 
                    disabled={!!propertyInfo?.surfaceArea}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opmerkingen</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Heeft u nog vragen of opmerkingen?"
                    className="resize-none bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2">
                <FormLabel>Datum afspraak</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? (
                        format(date, "PPP", { locale: enUS })
                      ) : (
                        <span>Kies een datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tijd afspraak</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        setTime(value);
                        field.onChange(value);
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Kies een tijd" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rush-service"
              checked={isRushService}
              onCheckedChange={handleRushServiceChange}
            />
            <label
              htmlFor="rush-service"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Spoedservice (+ €75)
            </label>
          </div>
          
          {calculatedPrice !== null && (
            <div className="highlight-section mt-4 p-4 bg-white/90 rounded-lg">
              <h4 className="font-medium text-lg mb-2">
                Totale prijs: €{calculatedPrice},-
              </h4>
              <p className="text-sm text-gray-700">
                Inclusief BTW
              </p>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Verzenden..." : "Vraag direct aan"}
          </Button>
        </form>
      </Form>
      
      <style>
        {`
        .highlight-section {
          border: 2px solid #10b981;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
          transform: scale(1.01);
        }
        `}
      </style>
    </>
  );
};

export default ContactForm;
