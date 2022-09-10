import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { produce } from 'immer';
import { EXP_THRESHOLD, ODDS_REROLL, TIER_CHAMPIONS_QTD, TOTAL_CHAMPIONS_IN_POOL } from "../data/constants";
import { playSound, randomNumberInRange } from "../utils/utils";
import { CHAMPION_LIST_TEST } from "../data/championTest";
import { CHAMPION_LIST as CHAMPION_LIST_BR } from '../data/pt-br/champions';
import { CHAMPION_LIST as CHAMPION_LIST_EN } from '../data/en-us/champions';
import useKeyboardShortcut from "use-keyboard-shortcut";
import audio from "../assets/audio/audio";

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
    bench: BenchType[];
    championMoving: number;
    language: string;
    buyExp: () => void;
    buyRoll: () => void;
    buyChampion: (champion: Champion, championPositionOnStoreArray: number) => void;
    changeGold: (newGold: number) => void;
    changeLevel: (newLevel: keyof typeof ODDS_REROLL) => void;
    moveChampionOnBench: (dragIndex: number, hoverIndex: number) => void;
    moveChampionToDeleteZone: (dragIndex: number) => void
    isChampionMoving: (index: number) => void;
    changeLanguage: (newLanguage: string) => void;
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

export interface BenchType {
    champion: Champion;
    tier: number;
}

export const ShopContext = createContext({} as ShopContextType);

const ChampionPoolStatic: ChampionPoolType = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
}

const emptyChampion: Champion = {
    championId: "",
    name: "",
    cost: 0,
    traits: [],
    value: 0,
}

const emptyChampionBench: BenchType = {
    champion: emptyChampion,
    tier: 0
}

const benchInitiator: BenchType[] = [
    emptyChampionBench,
    emptyChampionBench,
    emptyChampionBench,
    emptyChampionBench,
    emptyChampionBench,
    emptyChampionBench,
    emptyChampionBench,
    emptyChampionBench,
    emptyChampionBench,
]

interface ShopContextProviderProps {
    children: ReactNode;
}

export function ShopContextProvider({ children }: ShopContextProviderProps) {
    const [language, setLanguage] = useState(() => {
        const storedStateAsJSON = localStorage.getItem('@rolldown-simulator:language-1.0.0');

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON);
        }

        return 'en-us';
    });
    // const CHAMPION_LIST = useChampionList('pt-br');
    const [level, setLevel] = useState<keyof typeof ODDS_REROLL>(2);
    const [xp, setXp] = useState(0);
    const [gold, setGold] = useState(50);
    const [championPool, setChampionPool] = useState<ChampionPoolType>(ChampionPoolStatic);
    const [store, setStore] = useState<Champion[]>([]);
    const [bench, setBench] = useState<BenchType[]>(benchInitiator);
    const [championMoving, setChampionMoving] = useState(-1);

    useKeyboardShortcut(
        ["D"],
        () => buyRoll()
    );
    useKeyboardShortcut(
        ["F"],
        () => buyExp()
    );

    const changeLanguage = useCallback((newLanguage: string) => {
        setLanguage(newLanguage);
        window.location.reload();
    }, [language])

    const buyExp = useCallback(() => {
        if (gold < 4 || level >= 9) return;
        playSound(audio.BuyExpAudio);
        setXp(xp+4);
        setGold(gold-4);
    }, [gold, xp, level]);

    const buyRoll = useCallback(() => {
        if (gold < 2) return;
        playSound(audio.RefreshAudio);
        setGold(gold-2);
        restoreChampionsOnStoreToPool();
        rerollShop();
    }, [gold]);

    const changeGold = useCallback((newGold: number) => {
        setGold(newGold);
        playSound(audio.GoldAudio);
    }, [gold]);

    const changeLevel = useCallback((newLevel: keyof typeof ODDS_REROLL) => {
        setLevel(newLevel);
        playSound(audio.PlayerLevelUpAudio);
    }, [gold]);

    const buyChampion = useCallback((champion: Champion, championPositionOnStoreArray: number) => {
        if (gold < champion.cost) return;
        const cost = champion.value ? champion.value : champion.cost;
        const insertingChampion: BenchType = {
            champion: champion,
            tier: 1,
        }
        const checkUpgrade = checkChampionUpgrade(insertingChampion);
        if (!checkUpgrade) {
            if (benchLength() >= 9) return;
            const indexToInsert = bench.findIndex(curr => curr.champion.name === "");
            if (indexToInsert >= 0) {
                setBench(produce(draft => {
                    draft[indexToInsert] = insertingChampion;
                }));
            } else {
                setBench(produce(draft => {
                    draft.push(insertingChampion);
                }));
            }
        } else {
            insertUpgradedChampion(insertingChampion);
        }
        setGold(gold - cost);
        playSound(audio.BuyChampionAudio);

        setStore(produce(draft => {
            draft[championPositionOnStoreArray] = emptyChampion;
        }));
    }, [gold, bench, store]);

    const isChampionMoving = useCallback((index: number) => {
        setChampionMoving(index);
    }, [championMoving]);

    const moveChampionOnBench = useCallback((dragIndex: number, hoverIndex: number) => {
        playSound(audio.DropAudio);
        setBench(produce(draft => {
            [draft[hoverIndex], draft[dragIndex]] = [draft[dragIndex], draft[hoverIndex]];
        }));
    }, [bench]);

    const moveChampionToDeleteZone = useCallback((dragIndex: number) => {
        const cost = checkCostBenchChampion(dragIndex);
        if (cost !== undefined) {
            setGold(gold + cost);
        }
        playSound(audio.SellChampionAudio);
        setBench(produce(draft => {
            draft[dragIndex] = emptyChampionBench;
        }));
    }, [gold, bench]);

    function checkCostBenchChampion(index: number) {
        const costUnit = bench[index].champion.value ? bench[index].champion.value : bench[index].champion.cost;
        const tier = bench[index].tier;
        const tierChampions = TIER_CHAMPIONS_QTD[tier-1];
        if (costUnit !== undefined) {
            if (costUnit === 1 || tier === 1) {
                return costUnit * tierChampions;
            }
            return costUnit * tierChampions -1;
        }
    }

    useEffect(() => {
        if (xp >= EXP_THRESHOLD[level]) {
            playSound(audio.PlayerLevelUpAudio);
            setXp(xp - EXP_THRESHOLD[level])
            setLevel((level+1) as keyof typeof ODDS_REROLL);
        }
    }, [xp, level]);
    
    useEffect(() => {
        const stateJSON = JSON.stringify(language);

        localStorage.setItem('@rolldown-simulator:language-1.0.0', stateJSON);

        const champ_list_locale = language === 'pt-br' ? CHAMPION_LIST_BR : CHAMPION_LIST_EN

        champ_list_locale.map((champion) => {
            const cost = champion.cost as keyof ChampionPoolType;
            if (cost <= 5) {
                ChampionPoolStatic[cost].push({
                    champion: champion,
                    qtd: TOTAL_CHAMPIONS_IN_POOL[cost]
                });
            }
        });
    }, [language]);

    useEffect(() => {
        rerollShop();
    }, []);

    function benchLength() {
        let counter = 0;
        bench.forEach(benchChampion => {
            benchChampion.champion.name !== "" ? counter++ : counter;
        })
        return counter;
    }
    
    function checkChampionUpgrade(champion: BenchType) {
        let counter = 0;
        bench.forEach(benchChampion => {
            benchChampion.champion === champion.champion && benchChampion.tier === champion.tier ? counter++ : counter;
        })
        return counter >= 2 ? true : false;
    }

    function insertUpgradedChampion(insertingChampion: BenchType) {
        const indexChampionOnArrayToUpgrade = bench.findIndex((benchChampion => benchChampion.champion === insertingChampion.champion && benchChampion.tier === insertingChampion.tier));
        const indexChampionOnArrayToRemove = bench.findIndex(((benchChampion, index) => benchChampion.champion === insertingChampion.champion && benchChampion.tier === insertingChampion.tier && index !== indexChampionOnArrayToUpgrade));
        const upgradedChampion: BenchType = {
            champion: insertingChampion.champion,
            tier: insertingChampion.tier+1,
        };
        const checkUpgrade = checkChampionUpgrade(upgradedChampion);
        if (!checkUpgrade) {
            playSound(audio.ChampionLevelUpTier2Audio);
            setBench(produce(draft => {
                draft[indexChampionOnArrayToUpgrade].tier++;
                draft[indexChampionOnArrayToRemove] = emptyChampionBench;
            }));
        } else {
            playSound(audio.ChampionLevelUpTier3Audio);
            insertUpgradedChampionTier3(upgradedChampion, indexChampionOnArrayToUpgrade, indexChampionOnArrayToRemove);
        }
    }

    function insertUpgradedChampionTier3(insertingChampion: BenchType, indexChampionOnArrayToRemove2:number, indexChampionOnArrayToRemove3:number) {
        const indexChampionOnArrayToUpgrade = bench.findIndex((benchChampion => benchChampion.champion === insertingChampion.champion && benchChampion.tier === insertingChampion.tier));
        const indexChampionOnArrayToRemove = bench.findIndex(((benchChampion, index) => benchChampion.champion === insertingChampion.champion && benchChampion.tier === insertingChampion.tier && index !== indexChampionOnArrayToUpgrade));
        setBench(produce(draft => {
            draft[indexChampionOnArrayToUpgrade].tier++;
            draft[indexChampionOnArrayToRemove3] = emptyChampionBench;
            draft[indexChampionOnArrayToRemove2] = emptyChampionBench;
            draft[indexChampionOnArrayToRemove] = emptyChampionBench;
        }));
    }

    function restoreChampionsOnStoreToPool() {
        store.forEach(champion => {
            champion.name === "" || addChampionToPool(champion);
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
        <ShopContext.Provider value={{ xp, level, gold, store, bench, championMoving, language, buyExp, buyRoll, buyChampion, changeGold, changeLevel, moveChampionOnBench, moveChampionToDeleteZone, isChampionMoving, changeLanguage }}>
            {children}
        </ShopContext.Provider>
    )
}