import { GoldIcon } from "../../../../GoldIcon/styles";
import { ButtonGoldPrice, ButtonInfo } from "../styles";
import { RefreshButtonContainer } from "./styles";

interface RefreshButtonProps {
    isActive: boolean;
}

export function RefreshButton({ isActive }: RefreshButtonProps) {
    return (
        <RefreshButtonContainer disabled={isActive}>
            <ButtonInfo>
                <span>Atualizar</span>
                <ButtonGoldPrice>
                    <GoldIcon size={16} />
                    <span>4</span>
                </ButtonGoldPrice>
            </ButtonInfo>
        </RefreshButtonContainer>
    )
}