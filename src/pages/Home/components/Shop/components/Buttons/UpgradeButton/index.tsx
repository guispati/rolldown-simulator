import { GoldIcon } from "../../../../GoldIcon/styles";
import { ButtonGoldPrice, ButtonInfo } from "../styles";
import { UpgradeButtonContainer } from "./styles";

interface UpgradeButtonProps {
    isActive: boolean;
}

export function UpgradeButton({ isActive }: UpgradeButtonProps) {
    return (
        <UpgradeButtonContainer disabled={isActive}>
            <ButtonInfo>
                <span>Comprar EXP</span>
                <ButtonGoldPrice>
                    <GoldIcon size={16} />
                    <span>4</span>
                </ButtonGoldPrice>
            </ButtonInfo>
        </UpgradeButtonContainer>
    )
}