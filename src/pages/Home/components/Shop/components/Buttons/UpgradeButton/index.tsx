import { useEffect, useState } from "react";
import { GoldPrice } from "../../../../../../../components/GoldPrice";
import { ShopContext } from "../../../../../../../contexts/ShopContext";
import { ButtonInfo } from "../styles";
import { UpgradeButtonContainer } from "./styles";
import { useContextSelector } from "use-context-selector";
import { LocaleType } from "../../../../../../../locales/types";
import useLanguage from "../../../../../../../hooks/useLanguage";

export function UpgradeButton() {
    const buyExp = useContextSelector(ShopContext, (context) => {
        return context.buyExp;
    });
    const gold = useContextSelector(ShopContext, (context) => {
        return context.gold;
    });
    const level = useContextSelector(ShopContext, (context) => {
        return context.level;
    });
    const language = useContextSelector(ShopContext, (context) => {
        return context.language;
    });
    const [active, setActive] = useState<boolean>(true);

    const languageText: LocaleType = useLanguage(language);

    useEffect(() => {
        setActive((gold < 4 || level >= 9))
    },[gold]);

    return (
        <UpgradeButtonContainer disabled={active} onClick={buyExp}>
            <ButtonInfo>
                <span>{languageText.upgradeButtonText}</span>
                <GoldPrice price={4} />
            </ButtonInfo>
        </UpgradeButtonContainer>
    )
}