import { ChampionImage, ChampionInfo, ChampionTileContainer, Trait, TraitBg, Traits } from "./styles";
import { GoldPrice } from "../../../../../../../../components/GoldPrice";
import { Champion, ShopContext } from "../../../../../../../../contexts/ShopContext";
import useImage from "../../../../../../../../hooks/useImage";
import { memo, useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";


interface ChampionTileProps {
    champion: Champion;
    championIndexOnArray: number;
}

function ChampionTileComponent({ champion, championIndexOnArray }: ChampionTileProps) {
    const buyChampion = useContextSelector(ShopContext, (context) => {
        return context.buyChampion;
    });
    const gold = useContextSelector(ShopContext, (context) => {
        return context.gold;
    });
    const language = useContextSelector(ShopContext, (context) => {
        return context.language;
    });
    const [active, setActive] = useState<boolean>(true);

    const isChampionValid = champion.name === "" ? false : true;

    function handleClickChampion() {
        isChampionValid && buyChampion(champion, championIndexOnArray);
    }

    useEffect(() => {
        setActive((gold < champion.cost))
    },[gold]);

    return (
        <ChampionTileContainer tier={champion.value ? champion.value : champion.cost} onClick={handleClickChampion}>
        {isChampionValid && (
            <>
                <ChampionImage src={useImage(champion.championId, "champion")} disabled={active} />
                <Traits>
                    {champion.traits.map(trait => {
                        return (
                            <Trait key={trait}>
                                <TraitBg>
                                    <img src={useImage(trait, "trait")} />
                                </TraitBg>
                                <span>{trait}</span>
                            </Trait>
                        )
                    })}
                </Traits>
                <ChampionInfo>
                    <span>{champion.name}</span>
                    <GoldPrice price={champion.value ? champion.value : champion.cost} />
                </ChampionInfo>
            </>
        )}
        </ChampionTileContainer>
    );
}

export const ChampionTile = memo(ChampionTileComponent);