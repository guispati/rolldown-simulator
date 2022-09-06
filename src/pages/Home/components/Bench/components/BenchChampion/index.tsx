import { BenchType } from "../../../../../../contexts/ShopContext";
import useImage from "../../../../../../hooks/useImage";
import { BenchChampionContainer, Champion1Star, Champion2Star, Champion3Star, ChampionName } from "./styles";

interface BenchChampionProps {
    champion: BenchType;
}

export function BenchChampion({ champion }: BenchChampionProps) {
    return (
        <BenchChampionContainer>
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
        </BenchChampionContainer>
    );
}