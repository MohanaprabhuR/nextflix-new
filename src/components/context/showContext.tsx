"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ShowContextType {
  showId: string | null;
  setShowId: (id: string) => void;
}

const ShowContext = createContext<ShowContextType | undefined>(undefined);

export const ShowProvider = ({ children }: { children: ReactNode }) => {
  const [showId, setShowId] = useState<string | null>(null);

  return (
    <ShowContext.Provider value={{ showId, setShowId }}>
      {children}
    </ShowContext.Provider>
  );
};

export const useShow = () => {
  const context = useContext(ShowContext);
  if (!context) {
    throw new Error("useShow must be used within a ShowProvider");
  }
  return context;
};
