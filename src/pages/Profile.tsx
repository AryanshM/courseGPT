import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Edit3, Save, Trophy, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setEditedName(parsed.name);
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, name: editedName };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved.",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const mockStats = {
    totalLearningDays: 42,
    completedTopics: 8,
    totalTopics: 12,
    streak: 7,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <Card className="card-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">
                        {isEditing ? (
                          <Input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="text-2xl font-bold"
                          />
                        ) : (
                          user.name
                        )}
                      </CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                  {isEditing ? (
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      size="sm"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Learning Focus</Label>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">FastAPI</Badge>
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Python</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Learning Style</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visual learner with hands-on practice preference
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <Card className="card-elegant">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Learning Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Learning Days</span>
                  <span className="font-semibold">{mockStats.totalLearningDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Topics Completed</span>
                  <span className="font-semibold">
                    {mockStats.completedTopics}/{mockStats.totalTopics}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Streak</span>
                  <span className="font-semibold text-primary">{mockStats.streak} days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed "What is FastAPI?"</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started Environment Setup</span>
                    <span className="text-xs text-muted-foreground">1d ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Took Quiz: React Basics</span>
                    <span className="text-xs text-muted-foreground">2d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;