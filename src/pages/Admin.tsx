
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { formatDateNL } from "@/utils/dateFormatters";
import WebContentEditor, { WebsiteContent } from "@/components/admin/WebContentEditor";
import SubmissionsTable, { ContactSubmission } from "@/components/admin/SubmissionsTable";
import SubmissionDetail from "@/components/admin/SubmissionDetail";
import AdminAuth from "@/components/admin/AdminAuth";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [webContent, setWebContent] = useState<WebsiteContent[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchSubmissions();
      fetchWebContent();
    }
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Add default status if missing
      const processedData = data?.map(submission => ({
        ...submission,
        status: submission.status || 'new'
      })) as ContactSubmission[];
      
      setSubmissions(processedData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Fout bij ophalen aanvragen",
        description: "Kon aanvragen niet ophalen",
        variant: "destructive"
      });
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
      toast({
        title: "Fout bij ophalen website inhoud",
        description: "Kon website inhoud niet ophalen",
        variant: "destructive"
      });
    }
  };

  const handleSelectSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
  };

  const handleCloseDetail = () => {
    setSelectedSubmission(null);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    fetchSubmissions();
    fetchWebContent();
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-epa-green py-6 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">EPA Woninglabel Admin</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Website Content Management */}
        <Card className="mb-8 shadow-sm border-epa-gray">
          <CardHeader>
            <CardTitle className="text-2xl text-epa-green-dark">Website Inhoud Beheren</CardTitle>
            <CardDescription>Bewerk de tekst en inhoud die op de website getoond wordt</CardDescription>
          </CardHeader>
          <CardContent>
            <WebContentEditor 
              webContent={webContent} 
              onRefresh={fetchWebContent} 
            />
          </CardContent>
        </Card>
        
        <Separator className="my-8" />
        
        {/* Contact Submissions Section */}
        <Card className="shadow-sm border-epa-gray">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-epa-green-dark">Energielabel Aanvragen</CardTitle>
              <CardDescription>Beheer en verwerk inkomende aanvragen</CardDescription>
            </div>
            <Button onClick={fetchSubmissions} variant="outline" className="gap-2 bg-white hover:bg-epa-green-light hover:text-epa-green-dark">
              <RefreshCw className="h-4 w-4" /> Vernieuwen
            </Button>
          </CardHeader>
          <CardContent>
            <SubmissionsTable 
              submissions={submissions} 
              loading={loading} 
              formatDate={formatDateNL}
              onSelectSubmission={handleSelectSubmission}
            />
          </CardContent>
        </Card>
      </div>

      {/* Submission Detail Dialog */}
      {selectedSubmission && (
        <SubmissionDetail
          submission={selectedSubmission}
          isOpen={!!selectedSubmission}
          onClose={handleCloseDetail}
          onUpdate={fetchSubmissions}
        />
      )}
    </div>
  );
};

export default Admin;
