import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Brain, RotateCcw } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  subtopicName: string;
  onClose: () => void;
}

export const Quiz = ({ subtopicName, onClose }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  // Mock quiz data
  const mockQuestions: QuizQuestion[] = [
    {
      id: "1",
      question: "What is the main advantage of FastAPI over Flask?",
      options: [
        "Automatic API documentation generation",
        "Better database support",
        "Easier deployment",
        "Smaller file size"
      ],
      correctAnswer: 0,
      explanation: "FastAPI automatically generates interactive API documentation using OpenAPI and JSON Schema, which is a major advantage over Flask."
    },
    {
      id: "2",
      question: "Which Python feature does FastAPI heavily rely on?",
      options: [
        "Lambda functions",
        "Type hints",
        "List comprehensions",
        "Decorators only"
      ],
      correctAnswer: 1,
      explanation: "FastAPI uses Python type hints for automatic request validation, serialization, and API documentation generation."
    },
    {
      id: "3",
      question: "What server is commonly used to run FastAPI applications?",
      options: [
        "Apache",
        "Nginx",
        "Uvicorn",
        "Gunicorn"
      ],
      correctAnswer: 2,
      explanation: "Uvicorn is an ASGI server that's commonly used to run FastAPI applications, providing excellent performance with async support."
    }
  ];

  const questions = mockQuestions;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl card-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            <CardDescription>
              You scored {score} out of {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <Badge variant={score >= questions.length * 0.7 ? "default" : "secondary"}>
                {score >= questions.length * 0.7 ? "Great job!" : "Keep learning!"}
              </Badge>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button onClick={handleRestart} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={onClose}>
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl card-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Quiz: {subtopicName}
              </CardTitle>
              <CardDescription>
                Question {currentQuestion + 1} of {questions.length}
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
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${
                        selectedAnswer === index
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    />
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Select an answer to continue
            </div>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};