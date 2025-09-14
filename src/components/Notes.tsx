import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StickyNote, Save, Edit3 } from "lucide-react";

interface NotesProps {
  subtopicName: string;
  topicName: string;
}

export const Notes = ({ subtopicName, topicName }: NotesProps) => {
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const notesKey = `notes_${topicName}_${subtopicName}`;

  useEffect(() => {
    const savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [notesKey]);

  const handleSave = () => {
    localStorage.setItem(notesKey, notes);
    setLastSaved(new Date());
    setIsEditing(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-primary" />
            My Notes
          </CardTitle>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <Badge variant="secondary" className="text-xs">
                Saved {formatTime(lastSaved)}
              </Badge>
            )}
            {isEditing ? (
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Take notes about this topic..."
            className="min-h-[120px] resize-none"
            autoFocus
          />
        ) : (
          <div className="min-h-[120px] p-3 bg-muted/30 rounded-md">
            {notes ? (
              <div className="whitespace-pre-wrap text-sm">{notes}</div>
            ) : (
              <div className="text-muted-foreground text-sm italic">
                Click "Edit" to add your notes about {subtopicName}...
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};