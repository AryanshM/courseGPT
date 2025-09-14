import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock, Target } from "lucide-react";

interface LearningFormData {
  topic: string;
  duration: string;
  level: string;
}

interface LearningPlannerFormProps {
  onGenerateRoadmap: (data: LearningFormData) => void;
}

export const LearningPlannerForm = ({ onGenerateRoadmap }: LearningPlannerFormProps) => {
  const [formData, setFormData] = useState<LearningFormData>({
    topic: "",
    duration: "",
    level: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic && formData.duration && formData.level) {
      onGenerateRoadmap(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          AI Learning Planner
        </h1>
        <p className="text-lg text-muted-foreground">
          Create a personalized learning roadmap tailored to your goals
        </p>
      </div>

      <Card className="card-elegant p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-base font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              What do you want to learn?
            </Label>
            <Input
              id="topic"
              placeholder="e.g., FastAPI, React, Python..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-base font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Duration (in days)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="e.g., 30"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="h-12 text-base"
              min="1"
              max="365"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level" className="text-base font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Detail Level
            </Label>
            <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner - I'm new to this topic</SelectItem>
                <SelectItem value="intermediate">Intermediate - I have some experience</SelectItem>
                <SelectItem value="deep-dive">Deep Dive - I want comprehensive coverage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            variant="hero"
            size="lg" 
            className="w-full h-12 text-base"
            disabled={!formData.topic || !formData.duration || !formData.level}
          >
            Generate My Learning Roadmap
          </Button>
        </form>
      </Card>
    </div>
  );
};