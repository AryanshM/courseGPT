import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send } from "lucide-react";

interface Comment {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  isOwn?: boolean;
}

interface CommentsProps {
  topicId: string;
}

export const Comments = ({ topicId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock comments data
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: "1",
        user: "Sarah Chen",
        message: "This topic is really helpful! The examples make it easy to understand.",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "2",
        user: "Mike Johnson",
        message: "Can someone explain the difference between async and sync operations here?",
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: "3",
        user: "Emma Wilson",
        message: "Great explanation! I'm starting to see how this connects to the previous topic.",
        timestamp: new Date(Date.now() - 900000),
      },
    ];
    setComments(mockComments);
  }, [topicId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: "You",
      message: newComment,
      timestamp: new Date(),
      isOwn: true,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <Card className="mt-6 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Discussion</h3>
          <span className="text-sm text-muted-foreground">({comments.length})</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Show"} Comments
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Comments List */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-secondary">
                    {getInitials(comment.user)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground break-words">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleSubmit} className="border-t pt-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Add to the discussion..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <Button type="submit" size="sm" className="mt-auto">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </Card>
  );
};