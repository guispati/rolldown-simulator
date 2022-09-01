import { GoldIcon } from "../GoldIcon/styles";
import { GoldPriceContainer } from "./styles";

interface GoldPriceProps {
    price: number;
}

export function GoldPrice({ price }: GoldPriceProps) {
    return (
        <GoldPriceContainer>
            <GoldIcon size={16} />
            <span>{price}</span>
        </GoldPriceContainer>
    );
}