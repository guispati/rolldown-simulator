import { createContext, ReactNode, useEffect, useState } from "react";
import { produce } from 'immer';
import { EXP_THRESHOLD, ODDS_REROLL, TOTAL_CHAMPIONS_IN_POOL } from "../data/constants";
import { CHAMPION_LIST } from "../data/champions";
import { randomNumberInRange } from "../utils/utils";

interface Champion {
    championId: string;
    name: string;
    cost: number;
    traits: string[];
}

interface ShopContextType {
    xp: number;
    level: keyof typeof ODDS_REROLL;
    gold: number;
    buyExp: () => void;
}

interface ChampionPoolCost {
    champion: Champion;
    qtd: number;
}

// interface ChampionPoolCostQtd {
//     cost: keyof ChampionPoolType;
//     qtd: number;
// }

interface ChampionPoolType {
    1: ChampionPoolCost[];
    2: ChampionPoolCost[];
    3: ChampionPoolCost[];
    4: ChampionPoolCost[];
    5: ChampionPoolCost[];
}

interface StoreType {
    1: Champion;
    2: Champion;
    3: Champion;
    4: Champion;
    5: Champion;
}

export const ShopContext = createContext({} as ShopContextType);

interface ShopContextProviderProps {
    children: ReactNode;
}

const ChampionPoolStatic: ChampionPoolType = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
}
CHAMPION_LIST.map((champion) => {
    const cost = champion.cost as keyof ChampionPoolType;
    if (cost <= 5) {
        ChampionPoolStatic[cost].push({
            champion: champion,
            qtd: TOTAL_CHAMPIONS_IN_POOL[cost]
        });
    }
});

export function ShopContextProvider({ children }: ShopContextProviderProps) {
    const [level, setLevel] = useState<keyof typeof ODDS_REROLL>(2);
    const [xp, setXp] = useState(0);
    const [gold, setGold] = useState(50);
    const [championPool, setChampionPool] = useState<ChampionPoolType>(ChampionPoolStatic);

    const [store, setStore] = useState<StoreType>({} as StoreType);

    const levelNormalized = level as keyof typeof ODDS_REROLL;

    // const championPool: championPoolType = {

    // }

    function buyExp() {
        if (gold < 4) return;
        setXp(xp+4);
        setGold(gold-4);
    }

    useEffect(() => {
        if (xp >= EXP_THRESHOLD[level]) {
            setXp(xp - EXP_THRESHOLD[level])
            setLevel((level+1) as keyof typeof ODDS_REROLL);
        }
    }, [xp, level]);

    useEffect(() => {
        // CHAMPION_LIST.map((champion) => {
        //     setChampionPool(produce(draft => {
        //         const cost = champion.cost as keyof ChampionPoolType;
        //         draft[cost].push({
        //             champion: champion,
        //             qtd: TOTAL_CHAMPIONS_IN_POOL[cost]
        //         });
        //     }));
        // });
        console.log(championPool);
        reroll(6, championPool);
    }, []);

    // useEffect(() => {
        
    // }, [championPool]);

    function getAllChampionsInPoolPerCost(championPool: ChampionPoolType, costRolled: keyof typeof championPool) {
        let allChampionsInPoolCostRolled = 0;

        championPool[costRolled].forEach((costQuantity) => {
            allChampionsInPoolCostRolled += costQuantity.qtd;
        });

        return allChampionsInPoolCostRolled;
    }

    function getRandomChampion(championPool: ChampionPoolType, costRolled: keyof typeof championPool, randChampion: number): Champion {
        let i = 0;
        let indexResult = 0;

        championPool[costRolled].forEach((costQuantity, index) => {
            i += costQuantity.qtd;
            if (i >= randChampion) {
                indexResult = index;
            }
            // return championPool[costRolled][0].champion;
        });
        return championPool[costRolled][indexResult].champion;
    }
    
    function reroll(level: keyof typeof ODDS_REROLL, championPool: ChampionPoolType) {
        const randomOdd = randomNumberInRange(0,100);
        let costRolled: keyof typeof championPool;

        if (randomOdd === 0) {
            costRolled = 1;
        } else {
            let i = 0;
            for(let runningPercentage = 0; randomOdd > runningPercentage; i++) {
                runningPercentage += ODDS_REROLL[level][i];
            }
            costRolled = i as keyof typeof championPool;
        }

        const allChampionsInPoolCostRolled: number = getAllChampionsInPoolPerCost(championPool, costRolled);
        
        // console.log(allChampionsInPoolCostRolled);

        const randChampion = Math.floor(Math.random() * allChampionsInPoolCostRolled);
        const championResult: Champion = getRandomChampion(championPool, costRolled, randChampion);
        console.log(championResult);
    }

    return (
        <ShopContext.Provider value={{ xp, level, gold, buyExp }}>
            {children}
        </ShopContext.Provider>
    )
}