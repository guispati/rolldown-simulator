import { createContext, ReactNode, useEffect, useState } from "react";
import { produce } from 'immer';
import { EXP_THRESHOLD, ODDS_REROLL, TOTAL_CHAMPIONS_IN_POOL } from "../data/constants";
import { CHAMPION_LIST } from "../data/champions";
import { randomNumberInRange } from "../utils/utils";

export interface Champion {
    championId: string;
    name: string;
    cost: number;
    traits: string[];
    value?: number;
}

interface ShopContextType {
    xp: number;
    level: keyof typeof ODDS_REROLL;
    gold: number;
    store: Champion[];
    buyExp: () => void;
    buyRoll: () => void;
}

interface ChampionPoolCost {
    champion: Champion;
    qtd: number;
}

interface ChampionPoolType {
    1: ChampionPoolCost[];
    2: ChampionPoolCost[];
    3: ChampionPoolCost[];
    4: ChampionPoolCost[];
    5: ChampionPoolCost[];
}

export const ShopContext = createContext({} as ShopContextType);

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

interface ShopContextProviderProps {
    children: ReactNode;
}

export function ShopContextProvider({ children }: ShopContextProviderProps) {
    const [level, setLevel] = useState<keyof typeof ODDS_REROLL>(9);
    const [xp, setXp] = useState(0);
    const [gold, setGold] = useState(50);
    const [championPool, setChampionPool] = useState<ChampionPoolType>(ChampionPoolStatic);

    const [store, setStore] = useState<Champion[]>([]);

    // const levelNormalized = level as keyof typeof ODDS_REROLL;

    function buyExp() {
        if (gold < 4 || level >= 9) return;
        setXp(xp+4);
        setGold(gold-4);
    }

    function buyRoll() {
        if (gold < 2) return;
        setGold(gold-2);
        restoreChampionsOnStoreToPool();
        rerollShop();
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
        // reroll();
        rerollShop();
    }, []);

    // useEffect(() => {

    // }, [championPool]);

    function restoreChampionsOnStoreToPool() {
        store.forEach(champion => {
            addChampionToPool(champion);
        });
    }

    function getAllChampionsInPoolPerCost(costRolled: keyof typeof championPool) {
        let allChampionsInPoolCostRolled = 0;

        championPool[costRolled].forEach((costQuantity) => {
            allChampionsInPoolCostRolled += costQuantity.qtd;
        });

        return allChampionsInPoolCostRolled;
    }

    function getRandomChampion(costRolled: keyof typeof championPool, randChampion: number): Champion {
        let i = 0, j = 0;

        for (let costQuantity of championPool[costRolled]) {
            i += costQuantity.qtd;
            if (i >= randChampion) {
                return championPool[costRolled][j].champion;
            }
            j++;
        }

        return championPool[costRolled][0].champion;
    }

    function getOddUsingProbabilityArray() {
        const randomOdd = randomNumberInRange(0,100);

        if (randomOdd === 0) {
            return 1
        } else {
            let i = 0;
            for(let runningPercentage = 0; randomOdd > runningPercentage; i++) {
                runningPercentage += ODDS_REROLL[level][i];
            }
            return i as keyof typeof championPool;
        }
    }

    function addChampionToPool(champ: Champion) {
        const cost = champ.cost as keyof typeof championPool;
        const championPositionOnArray = championPool[cost].findIndex(item => item.champion === champ);
        setChampionPool(produce(draft => {
            draft[cost][championPositionOnArray].qtd += 1;
        }));
    }

    function removeChampionFromPool(champ: Champion) {
        const cost = champ.cost as keyof typeof championPool;
        const championPositionOnArray = championPool[cost].findIndex(item => item.champion === champ);
        setChampionPool(produce(draft => {
            draft[cost][championPositionOnArray].qtd -= 1;
        }));
    }
    
    function reroll() {
        const costRolled = getOddUsingProbabilityArray();

        const allChampionsInPoolCostRolled: number = getAllChampionsInPoolPerCost(costRolled);

        const randChampion = Math.floor(Math.random() * allChampionsInPoolCostRolled);
        const championResult: Champion = getRandomChampion(costRolled, randChampion);
        removeChampionFromPool(championResult);
        return championResult;
    }

    function rerollShop() {
        setStore(produce(draft => {
            draft[1] = reroll();
            draft[2] = reroll();
            draft[3] = reroll();
            draft[4] = reroll();
            draft[5] = reroll();
        }));
    }

    return (
        <ShopContext.Provider value={{ xp, level, gold, store, buyExp, buyRoll }}>
            {children}
        </ShopContext.Provider>
    )
}