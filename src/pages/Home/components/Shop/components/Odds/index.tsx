import { useContextSelector } from "use-context-selector";
import { Tier } from "./components/Tier";
import { OddsContainer } from "./styles";
import { ODDS_REROLL } from "../../../../../../data/constants.js";
import { memo } from "react";
import { ShopContext } from "../../../../../../contexts/ShopContext";

function OddsComponent() {
    const level = useContextSelector(ShopContext, (context) => {
        return context.level;
    });
    
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

export const Odds = memo(OddsComponent);