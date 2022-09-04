import { useContext, useEffect, useState } from "react";
import { GoldPrice } from "../../../../../../../components/GoldPrice";
import { ShopContext } from "../../../../../../../contexts/ShopContext";
import { ButtonInfo } from "../styles";
import { RefreshButtonContainer } from "./styles";

export function RefreshButton() {
    const { buyRoll, gold } = useContext(ShopContext);
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