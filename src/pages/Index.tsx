import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LearningPlannerForm } from "@/components/LearningPlannerForm";
import { RoadmapViewer, Roadmap } from "@/components/RoadmapViewer";
import { DailyPlanViewer, DailyPlan } from "@/components/DailyPlanViewer";
import { StudyPanel } from "@/components/StudyPanel";
import { Flashcards } from "@/components/Flashcards";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, User, Undo2, Redo2, RotateCcw } from "lucide-react";
import { getRoadmapForTopic, getDailyPlanForTopic, getContentForSubtopic } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useUndoRedo } from "@/contexts/UndoRedoContext";
import { useProgress } from "@/hooks/useProgress";

type AppMode = 'form' | 'roadmap' | 'dailyplan' | 'flashcards';

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
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { toast } = useToast();
  const { canUndo, canRedo, undo, redo, addState, clearHistory } = useUndoRedo();
  const { progress, updateTotalSubtopics, resetProgress } = useProgress(formData?.topic);

  // Check for logged in user
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleGenerateRoadmap = (data: FormData) => {
    setFormData(data);
    const generatedRoadmap = getRoadmapForTopic(data.topic);
    setRoadmap(generatedRoadmap);
    addState(generatedRoadmap);
    
    // Update total subtopics for progress tracking
    const totalSubtopics = generatedRoadmap.topics.reduce(
      (sum, topic) => sum + topic.subtopics.length, 
      0
    );
    updateTotalSubtopics(totalSubtopics);
    
    setMode('roadmap');
    toast({
      title: "Roadmap Generated!",
      description: "Your personalized learning roadmap is ready for review.",
    });
  };

  const handleUpdateRoadmap = (updatedRoadmap: Roadmap) => {
    setRoadmap(updatedRoadmap);
    addState(updatedRoadmap);
    
    // Update total subtopics count
    const totalSubtopics = updatedRoadmap.topics.reduce(
      (sum, topic) => sum + topic.subtopics.length, 
      0
    );
    updateTotalSubtopics(totalSubtopics);
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
      addState(refinedRoadmap);
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
    clearHistory();
    resetProgress();
  };

  const handleUndo = () => {
    const previousRoadmap = undo();
    if (previousRoadmap) {
      setRoadmap(previousRoadmap);
      toast({
        title: "Undone!",
        description: "Reverted to previous version.",
      });
    }
  };

  const handleRedo = () => {
    const nextRoadmap = redo();
    if (nextRoadmap) {
      setRoadmap(nextRoadmap);
      toast({
        title: "Redone!",
        description: "Applied next version.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const openFlashcards = () => {
    setMode('flashcards');
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
              {progress.totalSubtopics > 0 && (
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{Math.round(progress.completionPercentage)}% Complete</span>
                  <div className="w-16 h-2 bg-secondary rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress.completionPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {mode === 'roadmap' && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleUndo} 
                    disabled={!canUndo}
                    className="flex items-center gap-1"
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRedo} 
                    disabled={!canRedo}
                    className="flex items-center gap-1"
                  >
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              {roadmap && mode !== 'flashcards' && (
                <Button variant="ghost" size="sm" onClick={openFlashcards}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Review
                </Button>
              )}
              {mode !== 'form' && mode !== 'flashcards' && (
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
              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      {user.name}
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
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

        {mode === 'flashcards' && roadmap && (
          <Flashcards
            roadmapTopics={roadmap.topics}
            onClose={() => setMode('roadmap')}
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
