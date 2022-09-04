import { ChampionInfo, ChampionTileContainer, Trait, TraitBg, Traits } from "./styles";
import { GoldPrice } from "../../../../../../../../components/GoldPrice";
import { Champion } from "../../../../../../../../contexts/ShopContext";
import useImage from "../../../../../../../../hooks/useImage";

interface ChampionTileProps {
    champion: Champion;
}

export function ChampionTile({ champion }: ChampionTileProps) {
    return (
        <ChampionTileContainer tier={champion.value ? champion.value : champion.cost}>
            <img src={useImage(champion.name, "champion")} />
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
        </ChampionTileContainer>
    );
}