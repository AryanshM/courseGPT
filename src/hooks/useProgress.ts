import { useState, useEffect } from "react";

interface ProgressData {
  completedSubtopics: Set<string>;
  totalSubtopics: number;
  completionPercentage: number;
}

export const useProgress = (roadmapId?: string) => {
  const [progress, setProgress] = useState<ProgressData>({
    completedSubtopics: new Set(),
    totalSubtopics: 0,
    completionPercentage: 0,
  });

  const storageKey = roadmapId ? `progress_${roadmapId}` : "progress_default";

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress({
          ...parsed,
          completedSubtopics: new Set(parsed.completedSubtopics),
        });
      } catch (error) {
        console.error("Failed to parse progress data:", error);
      }
    }
  }, [storageKey]);

  const saveProgress = (newProgress: ProgressData) => {
    const toSave = {
      ...newProgress,
      completedSubtopics: Array.from(newProgress.completedSubtopics),
    };
    localStorage.setItem(storageKey, JSON.stringify(toSave));
  };

  const markSubtopicComplete = (subtopicId: string) => {
    setProgress(prev => {
      const newCompleted = new Set(prev.completedSubtopics);
      newCompleted.add(subtopicId);
      
      const newProgress = {
        ...prev,
        completedSubtopics: newCompleted,
        completionPercentage: (newCompleted.size / prev.totalSubtopics) * 100,
      };
      
      saveProgress(newProgress);
      return newProgress;
    });
  };

  const markSubtopicIncomplete = (subtopicId: string) => {
    setProgress(prev => {
      const newCompleted = new Set(prev.completedSubtopics);
      newCompleted.delete(subtopicId);
      
      const newProgress = {
        ...prev,
        completedSubtopics: newCompleted,
        completionPercentage: (newCompleted.size / prev.totalSubtopics) * 100,
      };
      
      saveProgress(newProgress);
      return newProgress;
    });
  };

  const updateTotalSubtopics = (total: number) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        totalSubtopics: total,
        completionPercentage: total > 0 ? (prev.completedSubtopics.size / total) * 100 : 0,
      };
      
      saveProgress(newProgress);
      return newProgress;
    });
  };

  const isSubtopicComplete = (subtopicId: string) => {
    return progress.completedSubtopics.has(subtopicId);
  };

  const resetProgress = () => {
    const newProgress = {
      completedSubtopics: new Set<string>(),
      totalSubtopics: 0,
      completionPercentage: 0,
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  return {
    progress,
    markSubtopicComplete,
    markSubtopicIncomplete,
    updateTotalSubtopics,
    isSubtopicComplete,
    resetProgress,
  };
};