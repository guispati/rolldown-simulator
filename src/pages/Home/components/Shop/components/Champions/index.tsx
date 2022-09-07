import { useContext, useRef, useState } from "react";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { ChampionTile } from "./components/ChampionTile";
import { ChampionsContainer, ChampionsWrapper, SellChampionContainer } from "./styles";
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from "react-dnd";
import { DragItem, ItemTypes } from "../../../../../../libs/dnd";
import { TIER_CHAMPIONS_QTD } from "../../../../../../data/constants";

export function Champions() {
    const { store, moveChampionToDeleteZone, bench } = useContext(ShopContext);
    const ref = useRef<HTMLDivElement>(null);

    const [{isDragging}, drop] = useDrop<
        DragItem,
        void,
        { isDragging: DragItem }
    >({
        accept: ItemTypes.BENCHCHAMPION,
        collect(monitor) {
            return {
                isDragging: monitor.getItem(),
            }
        },
        drop(item: DragItem) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;

            moveChampionToDeleteZone(dragIndex);
        },
    });

    drop(ref);

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

    return (
        <ChampionsWrapper ref={ref}>
            {isDragging ? (
                <SellChampionContainer>
                    Sell for {checkCostBenchChampion(isDragging.index)} Gold
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