
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
        house_number_addition: formData.houseNumberAddition || null
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

    // Here you would typically add code to send the email
    // For now, we'll just log it and return a success message
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
