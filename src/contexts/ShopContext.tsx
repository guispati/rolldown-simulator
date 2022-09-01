import { createContext, ReactNode, useEffect, useState } from "react";
import { produce } from 'immer';
import { EXP_THRESHOLD } from "../data/constants";

interface ShopContextType {
    xp: number;
    level: number;
    gold: number;
    buyExp: () => void;
}

export const ShopContext = createContext({} as ShopContextType);

interface ShopContextProviderProps {
    children: ReactNode;
}

export function ShopContextProvider({ children }: ShopContextProviderProps) {
    const [level, setLevel] = useState(2);
    const [xp, setXp] = useState(0);
    const [gold, setGold] = useState(50);

    function buyExp() {
        setXp(xp+4);
        setGold(gold-4);
    }

    useEffect(() => {
        if (xp >= EXP_THRESHOLD[level]) {
            setXp(xp - EXP_THRESHOLD[level])
            setLevel(level+1);
        }
    }, [xp, level]);

    return (
        <ShopContext.Provider value={{ xp, level, gold, buyExp }}>
            {children}
        </ShopContext.Provider>
    )
}