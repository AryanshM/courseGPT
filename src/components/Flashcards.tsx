import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

interface FlashcardsProps {
  roadmapTopics: Array<{
    name: string;
    subtopics: Array<{ name: string }>;
  }>;
  onClose: () => void;
}

export const Flashcards = ({ roadmapTopics, onClose }: FlashcardsProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Generate flashcards from roadmap
  const generateFlashcards = (): Flashcard[] => {
    const flashcards: Flashcard[] = [];
    
    roadmapTopics.forEach((topic) => {
      topic.subtopics.forEach((subtopic) => {
        // Mock flashcard generation based on subtopic names
        if (subtopic.name.includes("What is")) {
          flashcards.push({
            id: `${topic.name}-${subtopic.name}`,
            question: `${subtopic.name}`,
            answer: `${subtopic.name.replace("What is ", "")} is a key concept in ${topic.name}. It provides essential functionality and understanding for building applications effectively.`,
            topic: topic.name
          });
        } else if (subtopic.name.includes("Install") || subtopic.name.includes("Setup")) {
          flashcards.push({
            id: `${topic.name}-${subtopic.name}`,
            question: `How do you ${subtopic.name.toLowerCase()}?`,
            answer: `To ${subtopic.name.toLowerCase()}, you need to follow the installation process, set up your environment, and verify the installation works correctly.`,
            topic: topic.name
          });
        } else {
          flashcards.push({
            id: `${topic.name}-${subtopic.name}`,
            question: `Explain: ${subtopic.name}`,
            answer: `${subtopic.name} is an important concept in ${topic.name}. Understanding this helps you master the fundamentals and apply them in real projects.`,
            topic: topic.name
          });
        }
      });
    });

    return flashcards;
  };

  const flashcards = generateFlashcards();

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const resetCards = () => {
    setCurrentCard(0);
    setShowAnswer(false);
  };

  if (flashcards.length === 0) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-elegant">
          <CardHeader>
            <CardTitle>No Flashcards Available</CardTitle>
            <CardDescription>
              Create a roadmap first to generate flashcards for review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentFlashcard = flashcards[currentCard];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl card-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Review Mode
              </CardTitle>
              <CardDescription>
                Card {currentCard + 1} of {flashcards.length}
              </CardDescription>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentCard + 1) / flashcards.length) * 100}%`,
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {currentFlashcard.topic}
            </Badge>
          </div>

          {/* Flashcard */}
          <div className="relative">
            <Card className="min-h-[300px] cursor-pointer border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="flex items-center justify-center h-full p-8">
                <div className="text-center space-y-4">
                  <div className="text-lg font-semibold">
                    {showAnswer ? "Answer:" : "Question:"}
                  </div>
                  <div className="text-xl">
                    {showAnswer ? currentFlashcard.answer : currentFlashcard.question}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="mt-4"
                  >
                    {showAnswer ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hide Answer
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Reveal Answer
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevCard} disabled={flashcards.length <= 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button variant="outline" onClick={resetCards}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>

            <Button variant="outline" onClick={nextCard} disabled={flashcards.length <= 1}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};