import { ChampionTile } from "./components/ChampionTile";
import { ChampionsContainer } from "./styles";

export function Champions() {
    return (
        <ChampionsContainer>
            <ChampionTile />
            <ChampionTile />
            <ChampionTile />
            <ChampionTile />
            <ChampionTile />
        </ChampionsContainer>
    );
}