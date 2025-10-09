import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Edit, Save, X, ChevronDown, ChevronRight } from 'lucide-react';
import { WebsiteContent } from "./WebContentEditor";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ContentManagerProps {
  content: WebsiteContent[];
  onRefresh: () => void;
}

export function ContentManager({ content, onRefresh }: ContentManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: ''
  });
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Group content by page
  const groupedContent = content.reduce<Record<string, WebsiteContent[]>>((acc, item) => {
    const key = item.page_path || 'Homepage';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const startEdit = (item: WebsiteContent) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || '',
      subtitle: item.subtitle || '',
      content: item.content || ''
    });
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from('website_content')
        .update({
          title: formData.title,
          subtitle: formData.subtitle,
          content: formData.content,
          last_updated: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Content bijgewerkt');
      setEditingId(null);
      onRefresh();
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Kon content niet bijwerken');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPageTitle = (pagePath: string) => {
    if (pagePath === 'Homepage') return '🏠 Homepage';
    return `📍 ${pagePath.replace('/energielabel-', '').replace(/-/g, ' ').replace('aanvragen', '')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Website Inhoud</h2>
        <p className="text-gray-500 mt-1">Beheer de content op je website per pagina</p>
      </div>

      <div className="space-y-3">
        {Object.entries(groupedContent).map(([page, items]) => (
          <Card key={page} className="overflow-hidden">
            <Collapsible
              open={expandedSections.has(page)}
              onOpenChange={() => toggleSection(page)}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    {expandedSections.has(page) ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                    <h3 className="font-semibold text-left">{getPageTitle(page)}</h3>
                    <span className="text-sm text-gray-500">({items.length} secties)</span>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="border-t divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-50/50">
                      {editingId === item.id ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm text-gray-700">
                              Sectie: {item.section_name}
                            </h4>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleSave(item.id)}>
                                <Save className="h-3 w-3 mr-1" />
                                Opslaan
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-medium text-gray-600">Titel</label>
                            <Input
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-medium text-gray-600">Subtitel</label>
                            <Input
                              value={formData.subtitle}
                              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-medium text-gray-600">Inhoud</label>
                            <Textarea
                              value={formData.content}
                              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                              rows={6}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                  {item.section_name}
                                </span>
                                <span className="text-xs text-gray-400">
                                  • {formatDate(item.last_updated)}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 mt-1">{item.title}</h4>
                              {item.subtitle && (
                                <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
                              )}
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => startEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          {item.content && (
                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{item.content}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
}
