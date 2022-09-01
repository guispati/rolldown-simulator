import { GoldPrice } from "../../../../../../../components/GoldPrice";
import { ButtonInfo } from "../styles";
import { UpgradeButtonContainer } from "./styles";

interface UpgradeButtonProps {
    isActive: boolean;
}

export function UpgradeButton({ isActive }: UpgradeButtonProps) {
    return (
        <UpgradeButtonContainer disabled={!isActive}>
            <ButtonInfo>
                <span>Comprar EXP</span>
                <GoldPrice price={4} />
            </ButtonInfo>
        </UpgradeButtonContainer>
    )
}