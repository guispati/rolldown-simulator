import { ChampionInfo, ChampionTileContainer, Trait, TraitBg, Traits } from "./styles";
import ChampionTileAatrox from "../../../../../../../../assets/champions-tiles/aatrox.png";
import TraitShimmerscale from "../../../../../../../../assets/traits/shimmerscale.png";
import TraitWarrior from "../../../../../../../../assets/traits/warrior.png";
import { GoldPrice } from "../../../../../../../../components/GoldPrice";

export function ChampionTile() {
    return (
        <ChampionTileContainer tier={1}>
            <img src={ChampionTileAatrox} />
            <Traits>
                <Trait>
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
                </Trait>
            </Traits>
            <ChampionInfo>
                <span>Aatrox</span>
                <GoldPrice price={4} />
            </ChampionInfo>
        </ChampionTileContainer>
    );
}