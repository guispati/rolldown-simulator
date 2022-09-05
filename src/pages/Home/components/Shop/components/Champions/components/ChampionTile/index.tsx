import { ChampionImage, ChampionInfo, ChampionTileContainer, Trait, TraitBg, Traits } from "./styles";
import { GoldPrice } from "../../../../../../../../components/GoldPrice";
import { Champion, ShopContext } from "../../../../../../../../contexts/ShopContext";
import useImage from "../../../../../../../../hooks/useImage";
import { useContext, useEffect, useState } from "react";

interface ChampionTileProps {
    champion: Champion;
}

export function ChampionTile({ champion }: ChampionTileProps) {
    const { buyChampion, gold } = useContext(ShopContext);
    const [active, setActive] = useState<boolean>(true);

    const isChampionValid = champion.name === "" ? false : true;

    function handleClickChampion() {
        isChampionValid && buyChampion(champion);
    }

    useEffect(() => {
        setActive((gold < champion.cost))
    },[gold]);

    return (
        <ChampionTileContainer tier={champion.value ? champion.value : champion.cost} onClick={handleClickChampion}>
        {isChampionValid && (
            <>
                <ChampionImage src={useImage(champion.name, "champion")} disabled={active} />
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