import { createContext, useContext, useState } from "react";

const GameSelectionContext = createContext<{
    // Types of context values
    selectedGameIgdbId: number | null;
    setSelectedGameIgdbId: (id: number) => void;
}>({
    // Initial context values
    selectedGameIgdbId: null,
    setSelectedGameIgdbId: () => {},
});

export const GameSelectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

    return (
        <GameSelectionContext.Provider value={{ selectedGameIgdbId: selectedGameId, setSelectedGameIgdbId: setSelectedGameId }}>
            {children}
        </GameSelectionContext.Provider>
    );
};

// Instead of writing useContext(GameSelectionContext) everywhere, you just call useGameSelection()
export const useGameSelection = () => useContext(GameSelectionContext);