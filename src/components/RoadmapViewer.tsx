import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, Edit2, Trash2, RefreshCw, CheckCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface Subtopic {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

export interface Roadmap {
  topics: Topic[];
}

interface RoadmapViewerProps {
  roadmap: Roadmap;
  onUpdateRoadmap: (roadmap: Roadmap) => void;
  onRefineRoadmap: (prompt: string) => void;
  onFinalizePlan: () => void;
}

export const RoadmapViewer = ({ roadmap, onUpdateRoadmap, onRefineRoadmap, onFinalizePlan }: RoadmapViewerProps) => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<{ type: 'topic' | 'subtopic'; id: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [refinePrompt, setRefinePrompt] = useState("");

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const startEditing = (type: 'topic' | 'subtopic', id: string, currentName: string) => {
    setEditingItem({ type, id });
    setEditValue(currentName);
  };

  const saveEdit = () => {
    if (!editingItem || !editValue.trim()) return;

    const updatedRoadmap = { ...roadmap };
    
    if (editingItem.type === 'topic') {
      const topicIndex = updatedRoadmap.topics.findIndex(t => t.id === editingItem.id);
      if (topicIndex !== -1) {
        updatedRoadmap.topics[topicIndex].name = editValue.trim();
      }
    } else {
      updatedRoadmap.topics.forEach(topic => {
        const subtopicIndex = topic.subtopics.findIndex(s => s.id === editingItem.id);
        if (subtopicIndex !== -1) {
          topic.subtopics[subtopicIndex].name = editValue.trim();
        }
      });
    }

    onUpdateRoadmap(updatedRoadmap);
    setEditingItem(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditValue("");
  };

  const removeTopic = (topicId: string) => {
    const updatedRoadmap = {
      topics: roadmap.topics.filter(t => t.id !== topicId)
    };
    onUpdateRoadmap(updatedRoadmap);
  };

  const removeSubtopic = (topicId: string, subtopicId: string) => {
    const updatedRoadmap = { ...roadmap };
    const topicIndex = updatedRoadmap.topics.findIndex(t => t.id === topicId);
    if (topicIndex !== -1) {
      updatedRoadmap.topics[topicIndex].subtopics = 
        updatedRoadmap.topics[topicIndex].subtopics.filter(s => s.id !== subtopicId);
    }
    onUpdateRoadmap(updatedRoadmap);
  };

  const handleRefine = () => {
    if (refinePrompt.trim()) {
      onRefineRoadmap(refinePrompt.trim());
      setRefinePrompt("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Learning Roadmap</h2>
        <p className="text-muted-foreground">Review and customize your learning path</p>
      </div>

      <Card className="card-elegant p-6">
        <div className="space-y-4">
          {roadmap.topics.map((topic) => (
            <div key={topic.id} className="border border-border rounded-lg overflow-hidden">
              <Collapsible
                open={expandedTopics.has(topic.id)}
                onOpenChange={() => toggleTopic(topic.id)}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      {expandedTopics.has(topic.id) ? (
                        <ChevronDown className="h-4 w-4 text-primary" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-primary" />
                      )}
                      {editingItem?.type === 'topic' && editingItem.id === topic.id ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="h-8 text-base font-medium"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="text-base font-medium">{topic.name}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {editingItem?.type === 'topic' && editingItem.id === topic.id ? (
                        <>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); saveEdit(); }}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing('topic', topic.id, topic.name);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTopic(topic.id);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="tree-expand">
                  <div className="p-4 space-y-2">
                    {topic.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="flex items-center justify-between p-3 bg-background rounded-md border border-border/50">
                        {editingItem?.type === 'subtopic' && editingItem.id === subtopic.id ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEdit();
                              if (e.key === 'Escape') cancelEdit();
                            }}
                            className="h-8"
                            autoFocus
                          />
                        ) : (
                          <span className="text-sm">{subtopic.name}</span>
                        )}
                        <div className="flex items-center gap-2">
                          {editingItem?.type === 'subtopic' && editingItem.id === subtopic.id ? (
                            <Button variant="ghost" size="sm" onClick={saveEdit}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEditing('subtopic', subtopic.id, subtopic.name)}
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSubtopic(topic.id, subtopic.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </Card>

      <Card className="card-elegant p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Refine Your Roadmap</h3>
          <Textarea
            placeholder="Add any additional requirements or modifications..."
            value={refinePrompt}
            onChange={(e) => setRefinePrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex gap-3">
            <Button 
              onClick={handleRefine} 
              variant="outline" 
              disabled={!refinePrompt.trim()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refine Roadmap
            </Button>
            <Button onClick={onFinalizePlan} variant="hero" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Finalize Learning Plan
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};