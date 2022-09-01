import { useContext } from "react";
import { GoldPrice } from "../../../../../../../components/GoldPrice";
import { ShopContext } from "../../../../../../../contexts/ShopContext";
import { ButtonInfo } from "../styles";
import { UpgradeButtonContainer } from "./styles";

interface UpgradeButtonProps {
    isActive: boolean;
}

export function UpgradeButton({ isActive }: UpgradeButtonProps) {
    const { buyExp } = useContext(ShopContext);
    return (
        <UpgradeButtonContainer disabled={!isActive} onClick={buyExp}>
            <ButtonInfo>
                <span>Comprar EXP</span>
                <GoldPrice price={4} />
            </ButtonInfo>
        </UpgradeButtonContainer>
    )
}