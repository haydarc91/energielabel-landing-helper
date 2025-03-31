
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// Define interfaces for our data types
interface WebsiteContent {
  id: string;
  section_name: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  last_updated: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  property_type: string | null;
  surface_area: number | null;
  rush_service: boolean | null;
  message: string | null;
  calculated_price: number | null;
  created_at: string;
  postcode: string | null;
  house_number: string | null;
  house_number_addition: string | null;
}

interface EditedValues {
  title: string;
  subtitle: string;
  content: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [webContent, setWebContent] = useState<WebsiteContent[]>([]);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<EditedValues>({
    title: '',
    subtitle: '',
    content: ''
  });

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

  const startEditing = (content: WebsiteContent) => {
    setEditingContent(content.id);
    setEditedValues({
      title: content.title || '',
      subtitle: content.subtitle || '',
      content: content.content || ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('website_content')
        .update({
          title: editedValues.title,
          subtitle: editedValues.subtitle,
          content: editedValues.content,
          last_updated: new Date().toISOString() // Convert Date to string for ISO format
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Inhoud succesvol bijgewerkt');
      setEditingContent(null);
      fetchWebContent();
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Kon inhoud niet bijwerken');
    }
  };

  const cancelEditing = () => {
    setEditingContent(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Administratie</h1>
      
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Website inhoud</h2>
        </div>
        
        <div className="space-y-4">
          {webContent.map((content) => (
            <Card key={content.id} className="p-4">
              <div className="mb-2 flex justify-between items-center">
                <h3 className="text-lg font-medium capitalize">{content.section_name} sectie</h3>
                {editingContent === content.id ? (
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => saveContent(content.id)}>Opslaan</Button>
                    <Button size="sm" variant="outline" onClick={cancelEditing}>Annuleren</Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => startEditing(content)}>Bewerken</Button>
                )}
              </div>
              
              {editingContent === content.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Titel</label>
                    <input
                      type="text"
                      name="title"
                      value={editedValues.title}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Subtitel</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={editedValues.subtitle}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Inhoud</label>
                    <textarea
                      name="content"
                      value={editedValues.content}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p><span className="font-medium">Titel:</span> {content.title}</p>
                  <p><span className="font-medium">Subtitel:</span> {content.subtitle}</p>
                  <p><span className="font-medium">Inhoud:</span> {content.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Laatst bijgewerkt: {formatDate(content.last_updated)}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Energielabel aanvragen</h2>
          <Button onClick={fetchSubmissions} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" /> Vernieuwen
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-epa-green" />
          </div>
        ) : submissions.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Geen aanvragen gevonden</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefoon</TableHead>
                  <TableHead>Adres</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Spoed</TableHead>
                  <TableHead>Prijs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{formatDate(submission.created_at)}</TableCell>
                    <TableCell>{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{submission.phone || '-'}</TableCell>
                    <TableCell>{submission.address || '-'}</TableCell>
                    <TableCell>{submission.property_type || '-'}</TableCell>
                    <TableCell>{submission.rush_service ? 'Ja' : 'Nee'}</TableCell>
                    <TableCell>€{submission.calculated_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
