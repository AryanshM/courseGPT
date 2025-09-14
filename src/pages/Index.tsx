import { useState } from "react";
import { LearningPlannerForm } from "@/components/LearningPlannerForm";
import { RoadmapViewer, Roadmap } from "@/components/RoadmapViewer";
import { DailyPlanViewer, DailyPlan } from "@/components/DailyPlanViewer";
import { StudyPanel } from "@/components/StudyPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getRoadmapForTopic, getDailyPlanForTopic, getContentForSubtopic } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type AppMode = 'form' | 'roadmap' | 'dailyplan';

interface FormData {
  topic: string;
  duration: string;
  level: string;
}

interface StudySession {
  topicName: string;
  subtopicName: string;
  prompt: string;
}

const Index = () => {
  const [mode, setMode] = useState<AppMode>('form');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(null);
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const { toast } = useToast();

  const handleGenerateRoadmap = (data: FormData) => {
    setFormData(data);
    const generatedRoadmap = getRoadmapForTopic(data.topic);
    setRoadmap(generatedRoadmap);
    setMode('roadmap');
    toast({
      title: "Roadmap Generated!",
      description: "Your personalized learning roadmap is ready for review.",
    });
  };

  const handleUpdateRoadmap = (updatedRoadmap: Roadmap) => {
    setRoadmap(updatedRoadmap);
  };

  const handleRefineRoadmap = (prompt: string) => {
    // Simulate refinement by slightly modifying the roadmap
    if (roadmap && formData) {
      const refinedRoadmap = {
        ...roadmap,
        topics: roadmap.topics.map(topic => ({
          ...topic,
          name: topic.name + " (Refined)"
        }))
      };
      setRoadmap(refinedRoadmap);
      toast({
        title: "Roadmap Refined!",
        description: "Your roadmap has been updated based on your feedback.",
      });
    }
  };

  const handleFinalizePlan = () => {
    if (formData) {
      const plan = getDailyPlanForTopic(formData.topic);
      setDailyPlan(plan);
      setMode('dailyplan');
      toast({
        title: "Daily Plan Created!",
        description: "Your structured learning plan is ready. Happy learning!",
      });
    }
  };

  const handleShowPrompt = (prompt: string, topicName: string, subtopicName: string) => {
    setStudySession({ topicName, subtopicName, prompt });
  };

  const handleCloseStudyPanel = () => {
    setStudySession(null);
  };

  const handleMarkComplete = () => {
    toast({
      title: "Progress Saved!",
      description: "Great job! Keep up the momentum.",
    });
    setStudySession(null);
  };

  const goBack = () => {
    if (mode === 'dailyplan') {
      setMode('roadmap');
    } else if (mode === 'roadmap') {
      setMode('form');
    }
  };

  const startOver = () => {
    setMode('form');
    setFormData(null);
    setRoadmap(null);
    setDailyPlan(null);
    setStudySession(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">AI Learning Planner</h1>
            </div>
            <div className="flex items-center gap-3">
              {mode !== 'form' && (
                <Button variant="ghost" onClick={goBack} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              {(mode === 'roadmap' || mode === 'dailyplan') && (
                <Button variant="outline" onClick={startOver}>
                  Start Over
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {mode === 'form' && (
          <LearningPlannerForm onGenerateRoadmap={handleGenerateRoadmap} />
        )}

        {mode === 'roadmap' && roadmap && (
          <RoadmapViewer
            roadmap={roadmap}
            onUpdateRoadmap={handleUpdateRoadmap}
            onRefineRoadmap={handleRefineRoadmap}
            onFinalizePlan={handleFinalizePlan}
          />
        )}

        {mode === 'dailyplan' && dailyPlan && (
          <DailyPlanViewer
            plan={dailyPlan}
            onShowPrompt={handleShowPrompt}
          />
        )}
      </main>

      {/* Study Panel Modal */}
      {studySession && (
        <StudyPanel
          topicName={studySession.topicName}
          subtopicName={studySession.subtopicName}
          prompt={studySession.prompt}
          content={getContentForSubtopic(studySession.subtopicName)}
          onClose={handleCloseStudyPanel}
          onMarkComplete={handleMarkComplete}
        />
      )}
    </div>
  );
};

export default Index;
