import { ChampionCost, ChampionInfo, ChampionTileContainer, Trait, TraitBg, Traits } from "./styles";
import ChampionTileAatrox from "../../../../../../../../assets/champions-tiles/aatrox.png";
import TraitShimmerscale from "../../../../../../../../assets/traits/shimmerscale.png";
import TraitWarrior from "../../../../../../../../assets/traits/warrior.png";
import { GoldIcon } from "../../../../../GoldIcon/styles";

export function ChampionTile() {
    return (
        <ChampionTileContainer tier={1}>
            <img src={ChampionTileAatrox} />
            <Traits>
                <Trait>
                    <TraitBg>
                        <img src={TraitShimmerscale} />
                    </TraitBg>
                    <span>Warrior</span>
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
                <ChampionCost>
                    <GoldIcon size={16} />
                    <span>1</span>
                </ChampionCost>
            </ChampionInfo>
        </ChampionTileContainer>
    );
}