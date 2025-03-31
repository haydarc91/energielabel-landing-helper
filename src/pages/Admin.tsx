
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDateNL } from "@/utils/dateFormatters";
import WebContentEditor, { WebsiteContent } from "@/components/admin/WebContentEditor";
import SubmissionsTable, { ContactSubmission } from "@/components/admin/SubmissionsTable";

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [webContent, setWebContent] = useState<WebsiteContent[]>([]);

  useEffect(() => {
    fetchSubmissions();
    fetchWebContent();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Kon aanvragen niet ophalen');
    } finally {
      setLoading(false);
    }
  };

  const fetchWebContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*');
      
      if (error) throw error;
      
      setWebContent(data || []);
    } catch (error) {
      console.error('Error fetching web content:', error);
      toast.error('Kon website inhoud niet ophalen');
    }
  };

  return (
    <div className="container mx-auto p-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Administratie</h1>
      
      {/* Web Content Editor Section */}
      <WebContentEditor 
        webContent={webContent} 
        onRefresh={fetchWebContent} 
      />
      
      {/* Contact Submissions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Energielabel aanvragen</h2>
          <Button onClick={fetchSubmissions} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" /> Vernieuwen
          </Button>
        </div>
        
        <SubmissionsTable 
          submissions={submissions} 
          loading={loading} 
          formatDate={formatDateNL} 
        />
      </div>
    </div>
  );
};

export default Admin;
