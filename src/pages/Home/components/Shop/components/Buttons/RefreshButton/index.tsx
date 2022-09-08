import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { GoldPrice } from "../../../../../../../components/GoldPrice";
import { ShopContext } from "../../../../../../../contexts/ShopContext";
import { ButtonInfo } from "../styles";
import { RefreshButtonContainer } from "./styles";

export function RefreshButton() {
    const buyRoll = useContextSelector(ShopContext, (context) => {
        return context.buyRoll;
    });
    const gold = useContextSelector(ShopContext, (context) => {
        return context.gold;
    });
    const [active, setActive] = useState<boolean>(true);

    useEffect(() => {
        setActive(gold < 2)
    },[gold]);

    return (
        <RefreshButtonContainer disabled={active} onClick={buyRoll}>
            <ButtonInfo>
                <span>Atualizar</span>
                <GoldPrice price={2} />
            </ButtonInfo>
        </RefreshButtonContainer>
    )
}