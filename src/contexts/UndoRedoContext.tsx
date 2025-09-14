import React, { createContext, useContext, useState, useCallback } from "react";
import { Roadmap } from "@/components/RoadmapViewer";

interface UndoRedoState {
  roadmaps: Roadmap[];
  currentIndex: number;
}

interface UndoRedoContextType {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => Roadmap | null;
  redo: () => Roadmap | null;
  addState: (roadmap: Roadmap) => void;
  clearHistory: () => void;
}

const UndoRedoContext = createContext<UndoRedoContextType | undefined>(undefined);

export const UndoRedoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UndoRedoState>({
    roadmaps: [],
    currentIndex: -1,
  });

  const canUndo = state.currentIndex > 0;
  const canRedo = state.currentIndex < state.roadmaps.length - 1;

  const addState = useCallback((roadmap: Roadmap) => {
    setState(prev => {
      // Remove any states after current index (for when we're in the middle of history)
      const newRoadmaps = prev.roadmaps.slice(0, prev.currentIndex + 1);
      newRoadmaps.push(JSON.parse(JSON.stringify(roadmap))); // Deep clone
      
      // Limit history to 20 states
      if (newRoadmaps.length > 20) {
        newRoadmaps.shift();
        return {
          roadmaps: newRoadmaps,
          currentIndex: newRoadmaps.length - 1,
        };
      }
      
      return {
        roadmaps: newRoadmaps,
        currentIndex: newRoadmaps.length - 1,
      };
    });
  }, []);

  const undo = useCallback(() => {
    if (!canUndo) return null;
    
    setState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex - 1,
    }));
    
    return state.roadmaps[state.currentIndex - 1];
  }, [canUndo, state.roadmaps, state.currentIndex]);

  const redo = useCallback(() => {
    if (!canRedo) return null;
    
    setState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
    }));
    
    return state.roadmaps[state.currentIndex + 1];
  }, [canRedo, state.roadmaps, state.currentIndex]);

  const clearHistory = useCallback(() => {
    setState({
      roadmaps: [],
      currentIndex: -1,
    });
  }, []);

  return (
    <UndoRedoContext.Provider
      value={{
        canUndo,
        canRedo,
        undo,
        redo,
        addState,
        clearHistory,
      }}
    >
      {children}
    </UndoRedoContext.Provider>
  );
};

export const useUndoRedo = () => {
  const context = useContext(UndoRedoContext);
  if (context === undefined) {
    throw new Error("useUndoRedo must be used within an UndoRedoProvider");
  }
  return context;
};