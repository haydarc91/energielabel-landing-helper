import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar, Clock, Save, Trash2 } from "lucide-react";
import { formatDateNL } from "@/utils/dateFormatters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactSubmission } from "./SubmissionsTable";

interface SubmissionDetailProps {
  submission: ContactSubmission;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const SubmissionDetail = ({ submission, isOpen, onClose, onUpdate }: SubmissionDetailProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState(submission.status || 'new');
  const [appointmentDate, setAppointmentDate] = useState(submission.appointment_date || '');
  const [appointmentTime, setAppointmentTime] = useState(submission.appointment_time || '');
  const [notes, setNotes] = useState(submission.notes || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // If status is scheduled but no date/time, show error
      if (status === 'scheduled' && (!appointmentDate || !appointmentTime)) {
        toast({
          title: "Fout",
          description: "Vul een datum en tijd in voor de afspraak",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // If appointment is set, automatically change status to scheduled
      if (appointmentDate && appointmentTime && status === 'new') {
        setStatus('scheduled');
      }

      const { error } = await supabase
        .from('contact_submissions')
        .update({
          status: status,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          notes: notes
        })
        .eq('id', submission.id);

      if (error) throw error;

      toast({
        title: "Opgeslagen",
        description: "De aanvraag is succesvol bijgewerkt",
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Fout bij opslaan",
        description: "De aanvraag kon niet worden bijgewerkt",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', submission.id);

      if (error) throw error;

      toast({
        title: "Verwijderd",
        description: "De aanvraag is succesvol verwijderd",
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Fout bij verwijderen",
        description: "De aanvraag kon niet worden verwijderd",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aanvraagdetails</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Klantgegevens</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Naam:</span> {submission.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {submission.email}
                </div>
                <div>
                  <span className="font-medium">Telefoon:</span> {submission.phone || '-'}
                </div>
                <div>
                  <span className="font-medium">Aanvraagdatum:</span> {formatDateNL(submission.created_at)}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Woninggegevens</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Adres:</span> {submission.address || '-'}
                </div>
                <div>
                  <span className="font-medium">Postcode:</span> {submission.postcode || '-'}
                </div>
                <div>
                  <span className="font-medium">Type woning:</span> {submission.property_type || '-'}
                </div>
                <div>
                  <span className="font-medium">Oppervlakte:</span> {submission.surface_area ? `${submission.surface_area} m²` : '-'}
                </div>
                <div>
                  <span className="font-medium">Spoed:</span> {submission.rush_service ? 'Ja' : 'Nee'}
                </div>
                <div>
                  <span className="font-medium">Prijs:</span> {submission.calculated_price ? `€${submission.calculated_price}` : '-'}
                </div>
              </div>
            </div>
          </div>

          {submission.message && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Bericht</h3>
              <p className="whitespace-pre-wrap">{submission.message}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Beheer aanvraag</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecteer status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Nieuw</SelectItem>
                    <SelectItem value="contacted">Contact gelegd</SelectItem>
                    <SelectItem value="scheduled">Ingepland</SelectItem>
                    <SelectItem value="completed">Afgerond</SelectItem>
                    <SelectItem value="cancelled">Geannuleerd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Aanvraag type</Label>
                <div className="p-2 bg-gray-100 rounded">
                  {submission.rush_service ? 'Spoed' : 'Regulier'}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-date" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Afspraakdatum
                </Label>
                <Input
                  id="appointment-date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="appointment-time" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Afspraaktijd
                </Label>
                <Input
                  id="appointment-time"
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <Label htmlFor="notes">Notities</Label>
              <Textarea
                id="notes"
                placeholder="Voeg notities toe..."
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {!showDeleteConfirm ? (
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading || isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Verwijderen
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-500">Weet je het zeker?</span>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
                  Ja, verwijder
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Annuleren
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Sluiten</Button>
            </DialogClose>
            <Button 
              onClick={handleSave}
              disabled={isLoading}
              className="bg-epa-green hover:bg-epa-green/90"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
              Opslaan
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDetail;
