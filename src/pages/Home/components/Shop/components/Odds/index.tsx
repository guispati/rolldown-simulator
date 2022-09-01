import { Tier } from "./components/Tier";
import { OddsContainer } from "./styles";

export function Odds() {
    return (
        <OddsContainer>
            <Tier tier={1} />
            <Tier tier={2} />
            <Tier tier={3} />
            <Tier tier={4} />
            <Tier tier={5} />
        </OddsContainer>
    );
}