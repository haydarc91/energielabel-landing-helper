import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Dashboard } from "@/components/admin/Dashboard";
import WebContentEditor, { WebsiteContent } from "@/components/admin/WebContentEditor";
import SubmissionsTable, { ContactSubmission } from "@/components/admin/SubmissionsTable";
import SubmissionDetail from "@/components/admin/SubmissionDetail";
import { formatDateNL } from "@/utils/dateFormatters";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, LogOut } from "lucide-react";

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [webContent, setWebContent] = useState<WebsiteContent[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const navigate = useNavigate();
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsSessionLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsSessionLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
      }
      
      const hasAdminRole = !!data;
      setIsAdmin(hasAdminRole);
      
      if (hasAdminRole) {
        fetchSubmissions();
        fetchWebContent();
      }
    } catch (error) {
      console.error('Error in checkAdminRole:', error);
      setIsAdmin(false);
    } finally {
      setIsSessionLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const processedData = data?.map(submission => ({
        ...submission,
        status: submission.status || 'new',
        appointment_date: submission.appointment_date || '',
        appointment_time: submission.appointment_time || '',
        notes: submission.notes || ''
      })) as ContactSubmission[];
      
      setSubmissions(processedData);
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

  const handleSelectSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
  };

  const handleCloseDetail = () => {
    setSelectedSubmission(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    toast.info('Je bent uitgelogd');
  };

  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-epa-green border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Bezig met laden...</p>
        </div>
      </div>
    );
  }

  if (!session || !user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Geen toegang</h2>
          <p className="text-gray-600 mb-6">
            Je hebt geen admin rechten. Neem contact op met de beheerder om toegang te krijgen.
          </p>
          <Button 
            onClick={handleSignOut}
            className="bg-epa-green hover:bg-epa-green-dark"
          >
            Terug naar login
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Toaster position="top-right" />
        
        <AdminSidebar 
          userEmail={user.email || ''} 
          onSignOut={handleSignOut}
          onNavigate={setActiveSection}
          activeSection={activeSection}
        />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'content' && 'Website Inhoud'}
                {activeSection === 'submissions' && 'Aanvragen'}
              </h1>
            </div>
            {activeSection === 'submissions' && (
              <Button 
                onClick={fetchSubmissions} 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Vernieuwen
              </Button>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {activeSection === 'dashboard' && (
              <Dashboard submissions={submissions} webContent={webContent} />
            )}

            {activeSection === 'content' && (
              <div className="max-w-7xl">
                <WebContentEditor 
                  webContent={webContent} 
                  onRefresh={fetchWebContent} 
                />
              </div>
            )}

            {activeSection === 'submissions' && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Alle Aanvragen</CardTitle>
                  <CardDescription>Beheer en verwerk inkomende energielabel aanvragen</CardDescription>
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
            )}
          </main>
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
    </SidebarProvider>
  );
};

export default Admin;
