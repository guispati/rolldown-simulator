import { useContext, useEffect, useState } from "react";
import { GoldPrice } from "../../../../../../../components/GoldPrice";
import { ShopContext } from "../../../../../../../contexts/ShopContext";
import { ButtonInfo } from "../styles";
import { UpgradeButtonContainer } from "./styles";

export function UpgradeButton() {
    const { buyExp, gold, level } = useContext(ShopContext);
    const [active, setActive] = useState<boolean>(true);

    useEffect(() => {
        setActive((gold < 4 || level >= 9))
    },[gold]);

    return (
        <UpgradeButtonContainer disabled={active} onClick={buyExp}>
            <ButtonInfo>
                <span>Comprar EXP</span>
                <GoldPrice price={4} />
            </ButtonInfo>
        </UpgradeButtonContainer>
    )
}