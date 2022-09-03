import { ChampionInfo, ChampionTileContainer, Trait, TraitBg, Traits } from "./styles";
import { GoldPrice } from "../../../../../../../../components/GoldPrice";
import { Champion } from "../../../../../../../../contexts/ShopContext";
import useImage from "../../../../../../../../hooks/useImage";

interface ChampionTileProps {
    champion: Champion;
}

export function ChampionTile({ champion }: ChampionTileProps) {
    return (
        <ChampionTileContainer tier={champion.cost}>
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
                {/* <Trait>
                    <TraitBg>
                        <img src={TraitShimmerscale} />
                    </TraitBg>
                    <span>Shimmerscale</span>
                </Trait>
                <Trait>
                    <TraitBg>
                        <img src={TraitWarrior} />
                    </TraitBg>
                    <span>Warrior</span>
                </Trait> */}
            </Traits>
            <ChampionInfo>
                <span>{champion.name}</span>
                <GoldPrice price={champion.cost} />
            </ChampionInfo>
        </ChampionTileContainer>
    );
}