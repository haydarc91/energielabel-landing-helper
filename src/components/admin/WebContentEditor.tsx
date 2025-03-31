
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Define interfaces for our data types
export interface WebsiteContent {
  id: string;
  section_name: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  last_updated: string;
}

interface EditedValues {
  title: string;
  subtitle: string;
  content: string;
}

interface WebContentEditorProps {
  webContent: WebsiteContent[];
  onRefresh: () => void;
}

const WebContentEditor = ({ webContent, onRefresh }: WebContentEditorProps) => {
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<EditedValues>({
    title: '',
    subtitle: '',
    content: ''
  });

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
      onRefresh();
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
  );
};

export default WebContentEditor;
