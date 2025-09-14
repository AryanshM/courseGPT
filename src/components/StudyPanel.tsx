import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, BookOpen, CheckCircle } from "lucide-react";

interface StudyPanelProps {
  topicName: string;
  subtopicName: string;
  prompt: string;
  content: string;
  onClose: () => void;
  onMarkComplete?: () => void;
}

export const StudyPanel = ({ 
  topicName, 
  subtopicName, 
  prompt, 
  content, 
  onClose, 
  onMarkComplete 
}: StudyPanelProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="card-elegant w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">{subtopicName}</h3>
              <p className="text-sm text-muted-foreground">{topicName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onMarkComplete && (
              <Button variant="outline" size="sm" onClick={onMarkComplete}>
                <CheckCircle className="h-4 w-4" />
                Mark Complete
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="bg-muted/50 rounded-lg p-4">
            <Badge variant="secondary" className="mb-3">Learning Prompt</Badge>
            <p className="text-sm font-medium">{prompt}</p>
          </div>

          <div className="prose prose-sm max-w-none">
            <div 
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};