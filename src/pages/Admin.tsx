import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDateNL } from "@/utils/dateFormatters";
import WebContentEditor, { WebsiteContent } from "@/components/admin/WebContentEditor";
import SubmissionsTable, { ContactSubmission } from "@/components/admin/SubmissionsTable";
import SubmissionDetail from "@/components/admin/SubmissionDetail";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Toaster } from 'sonner';
import { User, Session } from '@supabase/supabase-js';

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [webContent, setWebContent] = useState<WebsiteContent[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin role when session changes
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

    // THEN check for existing session
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

  // If session is loading, show loading state
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

  // If no session, redirect to login
  if (!session || !user) {
    return <Navigate to="/login" />;
  }

  // If not admin, show access denied
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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="bg-epa-green py-6 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Logo className="mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-white">Admin</h1>
              <p className="text-white/80 text-sm">Welkom, {user.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="bg-white text-epa-green-dark hover:bg-gray-100 flex items-center gap-2" 
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Uitloggen
          </Button>
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
