import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Play, Calendar, BookOpen, Target } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface DailyPlanSubtopic {
  name: string;
  prompt: string;
}

export interface DailyPlanTopic {
  name: string;
  subtopics: DailyPlanSubtopic[];
}

export interface DailyPlanDay {
  day: number;
  topics: DailyPlanTopic[];
}

export interface DailyPlan {
  plan: DailyPlanDay[];
}

interface DailyPlanViewerProps {
  plan: DailyPlan;
  onShowPrompt: (prompt: string, topicName: string, subtopicName: string) => void;
}

export const DailyPlanViewer = ({ plan, onShowPrompt }: DailyPlanViewerProps) => {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleDay = (day: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Learning Plan</h2>
        <p className="text-muted-foreground">Follow your structured daily learning path</p>
      </div>

      <div className="space-y-4">
        {plan.plan.map((dayPlan) => (
          <Card key={dayPlan.day} className="card-elegant overflow-hidden day-card-enter">
            <Collapsible
              open={expandedDays.has(dayPlan.day)}
              onOpenChange={() => toggleDay(dayPlan.day)}
            >
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    {expandedDays.has(dayPlan.day) ? (
                      <ChevronDown className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-primary" />
                    )}
                    <div className="flex items-center gap-3">
                      <div className="progress-ring w-10 h-10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary z-10">{dayPlan.day}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Day {dayPlan.day}</h3>
                        <p className="text-sm text-muted-foreground">
                          {dayPlan.topics.length} topic{dayPlan.topics.length > 1 ? 's' : ''} to cover
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Day {dayPlan.day}
                    </Badge>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="tree-expand">
                <div className="p-6 space-y-4">
                  {dayPlan.topics.map((topic, topicIndex) => {
                    const topicId = `${dayPlan.day}-${topicIndex}`;
                    return (
                      <div key={topicId} className="border border-border rounded-lg overflow-hidden">
                        <Collapsible
                          open={expandedTopics.has(topicId)}
                          onOpenChange={() => toggleTopic(topicId)}
                        >
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                              <div className="flex items-center gap-3">
                                {expandedTopics.has(topicId) ? (
                                  <ChevronDown className="h-4 w-4 text-primary" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-primary" />
                                )}
                                <BookOpen className="h-4 w-4 text-accent" />
                                <span className="font-medium">{topic.name}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {topic.subtopics.length} subtopic{topic.subtopics.length > 1 ? 's' : ''}
                              </Badge>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="tree-expand">
                            <div className="p-4 space-y-3">
                              {topic.subtopics.map((subtopic, subtopicIndex) => (
                                <div
                                  key={subtopicIndex}
                                  className="flex items-center justify-between p-3 bg-background rounded-md border border-border/50 card-hover"
                                >
                                  <div className="flex items-center gap-3">
                                    <Target className="h-3 w-3 text-primary" />
                                    <span className="text-sm font-medium">{subtopic.name}</span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onShowPrompt(subtopic.prompt, topic.name, subtopic.name)}
                                    className="flex items-center gap-2 text-xs"
                                  >
                                    <Play className="h-3 w-3" />
                                    Start Learning
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};