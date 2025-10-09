import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { WebsiteContent } from "./WebContentEditor";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BlogManagerProps {
  blogArticles: WebsiteContent[];
  onRefresh: () => void;
}

export function BlogManager({ blogArticles, onRefresh }: BlogManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    slug: ''
  });

  const startEdit = (article: WebsiteContent) => {
    setEditingId(article.id);
    setFormData({
      title: article.title || '',
      subtitle: article.subtitle || '',
      content: article.content || '',
      slug: article.page_path?.replace('/blog/', '') || ''
    });
  };

  const startCreate = () => {
    setIsCreating(true);
    setFormData({ title: '', subtitle: '', content: '', slug: '' });
  };

  const handleSave = async (id?: string) => {
    try {
      if (!formData.title || !formData.slug) {
        toast.error('Titel en slug zijn verplicht');
        return;
      }

      const pagePath = `/blog/${formData.slug}`;

      if (id) {
        // Update existing
        const { error } = await supabase
          .from('website_content')
          .update({
            title: formData.title,
            subtitle: formData.subtitle,
            content: formData.content,
            page_path: pagePath,
            last_updated: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;
        toast.success('Artikel bijgewerkt');
      } else {
        // Create new
        const { error } = await supabase
          .from('website_content')
          .insert({
            section_name: 'blog_article',
            title: formData.title,
            subtitle: formData.subtitle,
            content: formData.content,
            page_path: pagePath,
            last_updated: new Date().toISOString()
          });

        if (error) throw error;
        toast.success('Artikel aangemaakt');
      }

      setEditingId(null);
      setIsCreating(false);
      onRefresh();
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Kon artikel niet opslaan');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit artikel wilt verwijderen?')) return;

    try {
      const { error } = await supabase
        .from('website_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Artikel verwijderd');
      onRefresh();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Kon artikel niet verwijderen');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Artikelen</h2>
          <p className="text-gray-500 mt-1">Beheer je blog content</p>
        </div>
        <Button onClick={startCreate} className="bg-epa-green hover:bg-epa-green-dark">
          <Plus className="h-4 w-4 mr-2" />
          Nieuw Artikel
        </Button>
      </div>

      {/* Article List */}
      <div className="grid gap-4">
        {blogArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {editingId === article.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Titel *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Artikel titel"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Slug (URL) *</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">/blog/</span>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                        placeholder="artikel-slug"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Samenvatting</label>
                    <Input
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Korte beschrijving van het artikel"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Inhoud</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={15}
                      placeholder="Schrijf hier je artikel inhoud..."
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tip: Gebruik enter voor nieuwe paragrafen, gebruik • voor bullet points
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(article.id)} className="bg-epa-green hover:bg-epa-green-dark">
                      <Save className="h-4 w-4 mr-2" />
                      Opslaan
                    </Button>
                    <Button variant="outline" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4 mr-2" />
                      Annuleren
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{article.subtitle}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        URL: {article.page_path} • Laatst bijgewerkt: {formatDate(article.last_updated)}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => startEdit(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nieuw Blog Artikel</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Titel *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Bijvoorbeeld: Energielabel Aanvragen in 2025"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Slug (URL) *</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">/blog/</span>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                  placeholder="energielabel-aanvragen-2025"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Alleen kleine letters, cijfers en streepjes</p>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Samenvatting</label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Korte beschrijving die getoond wordt in de preview"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Inhoud</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={20}
                placeholder="Schrijf hier je artikel inhoud..."
                className="font-mono text-sm"
              />
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <p>• Enter = nieuwe paragraaf</p>
                <p>• "Titel:" = heading</p>
                <p>• "• tekst" = bullet point</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreating(false)}>Annuleren</Button>
            <Button onClick={() => handleSave()} className="bg-epa-green hover:bg-epa-green-dark">
              <Save className="h-4 w-4 mr-2" />
              Artikel Aanmaken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
