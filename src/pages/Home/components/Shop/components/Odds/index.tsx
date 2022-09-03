import { Tier } from "./components/Tier";
import { OddsContainer } from "./styles";
import { ODDS_REROLL } from "../../../../../../data/constants.js";
import { useContext } from "react";
import { ShopContext } from "../../../../../../contexts/ShopContext";

export function Odds() {
    const { level } = useContext(ShopContext);
    
    return (
        <OddsContainer>
            <Tier tier={1} odd={ODDS_REROLL[level][0]} />
            <Tier tier={2} odd={ODDS_REROLL[level][1]} />
            <Tier tier={3} odd={ODDS_REROLL[level][2]} />
            <Tier tier={4} odd={ODDS_REROLL[level][3]} />
            <Tier tier={5} odd={ODDS_REROLL[level][4]} />
        </OddsContainer>
    );
}