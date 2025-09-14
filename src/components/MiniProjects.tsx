import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, ExternalLink, Clock, Star } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  technologies: string[];
  completed?: boolean;
}

interface MiniProjectsProps {
  topicName: string;
}

export const MiniProjects = ({ topicName }: MiniProjectsProps) => {
  // Mock project data based on topic
  const getProjectsForTopic = (topic: string): Project[] => {
    if (topic.toLowerCase().includes("fastapi")) {
      return [
        {
          id: "1",
          title: "To-Do API",
          description: "Build a REST API for managing todo items with CRUD operations",
          difficulty: "Easy",
          estimatedTime: "2-3 hours",
          technologies: ["FastAPI", "Pydantic", "SQLite"]
        },
        {
          id: "2",
          title: "Weather Service",
          description: "Create an API that fetches weather data and provides formatted responses",
          difficulty: "Medium",
          estimatedTime: "4-5 hours",
          technologies: ["FastAPI", "External APIs", "Async/Await"]
        },
        {
          id: "3",
          title: "User Authentication System",
          description: "Implement JWT-based authentication with user registration and login",
          difficulty: "Hard",
          estimatedTime: "6-8 hours",
          technologies: ["FastAPI", "JWT", "Password Hashing", "Database"]
        }
      ];
    } else if (topic.toLowerCase().includes("react")) {
      return [
        {
          id: "1",
          title: "Counter App",
          description: "Build a simple counter with increment, decrement, and reset functionality",
          difficulty: "Easy",
          estimatedTime: "1-2 hours",
          technologies: ["React", "useState", "Event Handling"]
        },
        {
          id: "2",
          title: "Recipe Finder",
          description: "Create a recipe search app with filtering and favorites",
          difficulty: "Medium",
          estimatedTime: "4-6 hours",
          technologies: ["React", "API Calls", "useEffect", "Conditional Rendering"]
        },
        {
          id: "3",
          title: "Task Management Dashboard",
          description: "Build a full-featured task manager with categories and progress tracking",
          difficulty: "Hard",
          estimatedTime: "8-10 hours",
          technologies: ["React", "Context API", "Local Storage", "Custom Hooks"]
        }
      ];
    }
    
    return [
      {
        id: "1",
        title: "Beginner Project",
        description: `Start with a simple project to practice ${topicName} fundamentals`,
        difficulty: "Easy",
        estimatedTime: "2-3 hours",
        technologies: [topicName, "Basic concepts"]
      }
    ];
  };

  const projects = getProjectsForTopic(topicName);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleStartProject = (project: Project) => {
    // Mock implementation - in real app, this could open a project template or guide
    console.log("Starting project:", project.title);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Try These Projects
        </CardTitle>
        <CardDescription>
          Hands-on projects to practice what you've learned in {topicName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="border border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.description}
                    </p>
                  </div>
                  <Badge
                    className={getDifficultyColor(project.difficulty)}
                    variant="outline"
                  >
                    {project.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {project.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    Project-based learning
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={() => handleStartProject(project)}
                  className="w-full"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};