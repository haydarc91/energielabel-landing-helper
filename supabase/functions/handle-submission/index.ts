
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Parse the request body
    const formData = await req.json();
    console.log("Received form data:", formData);

    // Store the form submission in the database
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        address: formData.address || null,
        property_type: formData.propertyType || null,
        surface_area: formData.surfaceArea || null,
        rush_service: formData.rushService || false,
        message: formData.message || null,
        calculated_price: formData.calculatedPrice || null,
        postcode: formData.postcode || null,
        house_number: formData.houseNumber || null,
        house_number_addition: formData.houseNumberAddition || null,
        status: 'new' // Set default status
      })
      .select();

    if (error) {
      console.error("Error inserting into database:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Error storing submission", 
          error: error.message 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Send data to webhook
    try {
      const webhookUrl = 'https://hook.eu2.make.com/y65lrc33vukmnh9eewt8r6b3p4ppw2rq';
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!webhookResponse.ok) {
        console.error("Webhook error:", webhookResponse.status);
      } else {
        console.log("Webhook sent successfully");
      }
    } catch (webhookError) {
      console.error("Error sending webhook:", webhookError);
      // Continue with the function even if webhook fails
    }

    // Send confirmation emails
    // This is a placeholder for actual email sending code
    // In a real implementation, you would use a service like SendGrid, Mailgun, etc.
    const customerEmailContent = `
      Beste ${formData.name},
      
      Bedankt voor uw aanvraag voor een energielabel. We hebben de volgende informatie ontvangen:
      
      Adres: ${formData.address}
      Type woning: ${formData.propertyType}
      Oppervlakte: ${formData.surfaceArea} m²
      Spoedservice: ${formData.rushService ? 'Ja' : 'Nee'}
      
      De totale kosten bedragen: €${formData.calculatedPrice} (incl. BTW)
      
      We nemen zo spoedig mogelijk contact met u op om een afspraak te maken voor de opname.
      
      Met vriendelijke groet,
      EPA Woninglabel
    `;
    
    const ownerEmailContent = `
      Nieuwe energielabel aanvraag:
      
      Naam: ${formData.name}
      Email: ${formData.email}
      Telefoon: ${formData.phone || 'Niet opgegeven'}
      
      Adres: ${formData.address}
      Postcode: ${formData.postcode}
      Huisnummer: ${formData.houseNumber} ${formData.houseNumberAddition || ''}
      
      Type woning: ${formData.propertyType}
      Oppervlakte: ${formData.surfaceArea} m²
      
      Spoedservice: ${formData.rushService ? 'Ja' : 'Nee'}
      
      Bericht: ${formData.message || 'Geen bericht'}
      
      Berekende prijs: €${formData.calculatedPrice}
    `;
    
    console.log("Would send customer email to:", formData.email);
    console.log("Would send owner email to: haydarcay@gmail.com");
    console.log("Customer email content:", customerEmailContent);
    console.log("Owner email content:", ownerEmailContent);
    
    console.log("Successfully saved submission, would send email with data:", formData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Submission received and stored",
        data
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Server error:", error.message);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Server error", 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
