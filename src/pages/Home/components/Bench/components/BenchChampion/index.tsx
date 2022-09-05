import { BenchType, Champion } from "../../../../../../contexts/ShopContext";
import useImage from "../../../../../../hooks/useImage";
import { BenchChampionContainer, ChampionName, ChampionStar } from "./styles";

interface BenchChampionProps {
    champion: BenchType;
}

export function BenchChampion({ champion }: BenchChampionProps) {
    return (
        <BenchChampionContainer>
            <ChampionStar tier={champion.tier} />
            <img src={useImage(champion.champion.name, "champion-icon")} />
            <ChampionName tier={champion.champion.value ? champion.champion.value : champion.champion.cost}>
                {champion.champion.name}
            </ChampionName>
            {/* <span>{champion.name}</span> */}
        </BenchChampionContainer>
    );
}