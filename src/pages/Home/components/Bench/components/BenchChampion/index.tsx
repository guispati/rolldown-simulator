import { BenchType, ShopContext } from "../../../../../../contexts/ShopContext";
import useImage from "../../../../../../hooks/useImage";
import { BenchChampionContainer, Champion1Star, Champion2Star, Champion3Star, ChampionName } from "./styles";
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { DragItem, ItemTypes } from "../../../../../../libs/dnd";
import { memo, useRef, useState } from "react";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { useContextSelector } from "use-context-selector";
import { playSound } from "../../../../../../utils/utils";
import DragAudio from "../../../../../../assets/audio/pickup.ogg";

interface BenchChampionProps {
    id: string;
    champion: BenchType;
    index: number;
}

function BenchChampionComponent({ id, champion, index }: BenchChampionProps) {
    const moveChampionOnBench = useContextSelector(ShopContext, (context) => {
        return context.moveChampionOnBench;
    });
    const moveChampionToDeleteZone = useContextSelector(ShopContext, (context) => {
        return context.moveChampionToDeleteZone;
    });
    const isChampionMoving = useContextSelector(ShopContext, (context) => {
        return context.isChampionMoving;
    });
    const [mouseHover, setMouseHover] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.BENCHCHAMPION,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        drop(item: DragItem) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveChampionOnBench(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });
    
    const [, drag] = useDrag({
        type: ItemTypes.BENCHCHAMPION,
        item: () => {
            return { id, index }
        },
        end() {
            isChampionMoving(-1);
        }
    })

    const isChampionValid = champion.champion.name === "" ? false : true;

    function handleHoverEnter() {
        isChampionValid && setMouseHover(true);
    }

    function handleHoverLeave() {
        isChampionValid && setMouseHover(false);
    }

    function handleDragStart() {
        if (isChampionValid) {
            playSound(DragAudio);
            isChampionMoving(index);
        }
    }

    useKeyboardShortcut(
        ["E"],
        () => mouseHover && moveChampionToDeleteZone(index)
    );

    drag(drop(ref));

    return (
        <BenchChampionContainer ref={ref} data-handler-id={handlerId} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onDragStart={handleDragStart}>
            {isChampionValid && (
                <>
                    <img src={useImage(champion.champion.name, "champion-icon")} />
                    {champion.tier === 1 ? (
                        <Champion1Star />
                    ) : champion.tier === 2 ? (
                        <Champion2Star />
                    ) : (
                        <Champion3Star />
                    )}
                    <ChampionName tier={champion.champion.value ? champion.champion.value : champion.champion.cost}>
                        {champion.champion.name}
                    </ChampionName>
                </>
            )}
        </BenchChampionContainer>
    );
}

export const BenchChampion = memo(BenchChampionComponent);