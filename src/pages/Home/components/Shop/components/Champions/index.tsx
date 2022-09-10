import { useCallback, useRef } from "react";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { ChampionTile } from "./components/ChampionTile";
import { ChampionsContainer, ChampionsWrapper, SellChampionContainer } from "./styles";
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from "react-dnd";
import { DragItem, ItemTypes } from "../../../../../../libs/dnd";
import { TIER_CHAMPIONS_QTD } from "../../../../../../data/constants";
import { useContextSelector } from "use-context-selector";
import { LocaleType } from "../../../../../../locales/types";
import useLanguage from "../../../../../../hooks/useLanguage";

export function Champions() {
    const store = useContextSelector(ShopContext, (context) => {
        return context.store;
    });
    const moveChampionToDeleteZone = useContextSelector(ShopContext, (context) => {
        return context.moveChampionToDeleteZone;
    });
    const bench = useContextSelector(ShopContext, (context) => {
        return context.bench;
    });
    const championMoving = useContextSelector(ShopContext, (context) => {
        return context.championMoving;
    });
    const language = useContextSelector(ShopContext, (context) => {
        return context.language;
    });

    const languageText: LocaleType = useLanguage(language);

    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<
        DragItem,
        void
    >({
        accept: ItemTypes.BENCHCHAMPION,
        drop(item: DragItem) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;

            moveChampionToDeleteZone(dragIndex);
        },
    });

    drop(ref);

    const checkCostBenchChampion = useCallback((index: number) => {
        const costUnit = bench[index].champion.value ? bench[index].champion.value : bench[index].champion.cost;
        const tier = bench[index].tier;
        const tierChampions = TIER_CHAMPIONS_QTD[tier-1];
        if (costUnit !== undefined) {
            if (costUnit === 1 || tier === 1) {
                return costUnit * tierChampions;
            }
            return costUnit * tierChampions -1;
        }
    }, [bench]);

    return (
        <ChampionsWrapper ref={ref}>
            {championMoving > -1 ? (
                <SellChampionContainer>
                    {languageText.sellChampionText} {checkCostBenchChampion(championMoving)} {languageText.goldText}
                </SellChampionContainer>
            ) : (
                <ChampionsContainer>
                    {store.map((shop, index) => {
                        return (
                            <ChampionTile key={uuidv4()} champion={shop} championIndexOnArray={index} />
                        )
                    })}
                </ChampionsContainer>
            )}
        </ChampionsWrapper>
    );
}