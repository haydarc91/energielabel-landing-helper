
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, X } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define interfaces for our data types
export interface WebsiteContent {
  id: string;
  section_name: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  last_updated: string;
  page_path?: string | null;
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
  const [newContent, setNewContent] = useState({
    section_name: '',
    title: '',
    subtitle: '',
    content: '',
    page_path: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("general");
  
  // Filter content by page path (null/undefined for general content)
  const generalContent = webContent.filter(content => !content.page_path);
  const landingPages = webContent.filter(content => content.page_path)
    .reduce<Record<string, WebsiteContent[]>>((acc, content) => {
      const path = content.page_path || '';
      if (!acc[path]) acc[path] = [];
      acc[path].push(content);
      return acc;
    }, {});
  
  const landingPagePaths = Object.keys(landingPages);

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

  const handleNewContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewContent(prev => ({
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
          last_updated: new Date().toISOString()
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

  const createNewContent = async () => {
    try {
      if (!newContent.section_name) {
        toast.error('Sectie naam is verplicht');
        return;
      }

      const { error } = await supabase
        .from('website_content')
        .insert({
          section_name: newContent.section_name,
          title: newContent.title || null,
          subtitle: newContent.subtitle || null,
          content: newContent.content || null,
          page_path: newContent.page_path || null,
          last_updated: new Date().toISOString()
        });
      
      if (error) throw error;
      
      toast.success('Nieuwe inhoud succesvol aangemaakt');
      setDialogOpen(false);
      setNewContent({
        section_name: '',
        title: '',
        subtitle: '',
        content: '',
        page_path: ''
      });
      onRefresh();
    } catch (error) {
      console.error('Error creating content:', error);
      toast.error('Kon nieuwe inhoud niet aanmaken');
    }
  };

  const createNewLandingPage = async (cityName: string) => {
    try {
      const pagePath = `/energielabel-${cityName.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Create hero section
      await supabase.from('website_content').insert({
        section_name: 'hero',
        title: `Energielabel voor uw woning in ${cityName}`,
        subtitle: `Professioneel EPA energielabel in ${cityName}, snel geregeld door gecertificeerde adviseurs`,
        content: `Wij verzorgen betrouwbare energielabels voor woningen in ${cityName} en omgeving. Onze EPA-adviseurs komen bij u langs voor een professionele opname.`,
        page_path: pagePath,
        last_updated: new Date().toISOString()
      });
      
      // Create intro section
      await supabase.from('website_content').insert({
        section_name: 'intro',
        title: `Energielabel specialist in ${cityName}`,
        subtitle: `Lokale EPA-adviseurs met kennis van ${cityName}`,
        content: `Als u een woning wilt verkopen of verhuren in ${cityName}, heeft u een geldig energielabel nodig. Onze adviseurs kennen de lokale woningmarkt in ${cityName} goed en kunnen u snel van dienst zijn met een officieel energielabel.`,
        page_path: pagePath,
        last_updated: new Date().toISOString()
      });
      
      // Create benefits section
      await supabase.from('website_content').insert({
        section_name: 'benefits',
        title: `Voordelen van ons energielabel in ${cityName}`,
        subtitle: `Waarom kiezen voor EPA Woninglabel in ${cityName}?`,
        content: `✓ Snelle service in heel ${cityName} en omgeving\n✓ Deskundige EPA-adviseurs met lokale kennis\n✓ Scherpe tarieven zonder verborgen kosten\n✓ Officieel geregistreerd bij RVO\n✓ Geldig voor 10 jaar`,
        page_path: pagePath,
        last_updated: new Date().toISOString()
      });
      
      toast.success(`Landingspagina voor ${cityName} succesvol aangemaakt`);
      onRefresh();
    } catch (error) {
      console.error('Error creating landing page:', error);
      toast.error(`Kon landingspagina voor ${cityName} niet aanmaken`);
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
  
  const renderContentItems = (contentItems: WebsiteContent[]) => {
    return contentItems.map((content) => (
      <Card key={content.id} className="p-4 mb-4">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-lg font-medium capitalize">{content.section_name} sectie</h3>
          {editingContent === content.id ? (
            <div className="space-x-2">
              <Button size="sm" onClick={() => saveContent(content.id)} className="flex items-center gap-1">
                <Save className="h-4 w-4" />Opslaan
              </Button>
              <Button size="sm" variant="outline" onClick={cancelEditing} className="flex items-center gap-1">
                <X className="h-4 w-4" />Annuleren
              </Button>
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
    ));
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Website inhoud</h2>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-epa-green hover:bg-epa-green-dark text-white flex items-center gap-1">
                <Plus className="h-4 w-4" /> Nieuwe inhoud
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nieuwe inhoud toevoegen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sectie naam *</label>
                  <input
                    type="text"
                    name="section_name"
                    value={newContent.section_name}
                    onChange={handleNewContentChange}
                    className="w-full p-2 border rounded"
                    placeholder="bijv. hero, features, etc."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pagina pad (optioneel)</label>
                  <input
                    type="text"
                    name="page_path"
                    value={newContent.page_path}
                    onChange={handleNewContentChange}
                    className="w-full p-2 border rounded"
                    placeholder="bijv. /energielabel-amsterdam"
                  />
                  <p className="text-xs text-gray-500">Laat leeg voor algemene inhoud</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titel</label>
                  <input
                    type="text"
                    name="title"
                    value={newContent.title}
                    onChange={handleNewContentChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitel</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={newContent.subtitle}
                    onChange={handleNewContentChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Inhoud</label>
                  <textarea
                    name="content"
                    value={newContent.content}
                    onChange={handleNewContentChange}
                    rows={4}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuleren</Button>
                <Button onClick={createNewContent} className="bg-epa-green hover:bg-epa-green-dark text-white">
                  Content aanmaken
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Landingspagina
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nieuwe landingspagina aanmaken</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plaatsnaam *</label>
                  <input
                    id="cityName"
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="bijv. Amsterdam, Utrecht, etc."
                  />
                  <p className="text-xs text-gray-500">
                    Er worden automatisch meerdere contentblokken aangemaakt voor deze plaats
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Annuleren</Button>
                <Button 
                  onClick={() => {
                    const cityName = (document.getElementById('cityName') as HTMLInputElement).value;
                    if (cityName) {
                      createNewLandingPage(cityName);
                    } else {
                      toast.error('Voer een plaatsnaam in');
                    }
                  }} 
                  className="bg-epa-green hover:bg-epa-green-dark text-white"
                >
                  Landingspagina aanmaken
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Algemene content</TabsTrigger>
          {landingPagePaths.map(path => (
            <TabsTrigger key={path} value={path}>
              {path.replace('/energielabel-', '').replace(/-/g, ' ')}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          {renderContentItems(generalContent)}
        </TabsContent>
        
        {landingPagePaths.map(path => (
          <TabsContent key={path} value={path} className="space-y-4">
            {renderContentItems(landingPages[path])}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WebContentEditor;
