import { GoldPrice } from "../../../../../../../components/GoldPrice";
import { ButtonInfo } from "../styles";
import { RefreshButtonContainer } from "./styles";

interface RefreshButtonProps {
    isActive: boolean;
}

export function RefreshButton({ isActive }: RefreshButtonProps) {
    return (
        <RefreshButtonContainer disabled={!isActive}>
            <ButtonInfo>
                <span>Atualizar</span>
                <GoldPrice price={2} />
            </ButtonInfo>
        </RefreshButtonContainer>
    )
}