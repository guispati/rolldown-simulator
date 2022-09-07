import { useContext } from "react";
import { GoldIcon } from "../../../../../../components/GoldIcon/styles";
import { GoldPriceContainer } from "../../../../../../components/GoldPrice/styles";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { GoldContainer } from "./styles";

export function Gold() {
    const { gold, changeGold } = useContext(ShopContext);

    function handleInputGold(event: React.ChangeEvent<HTMLInputElement>) {
        changeGold(parseInt(event.target.value));
    }

    return (
        <GoldContainer>
            <GoldPriceContainer>
                <GoldIcon size={16} />
                <input type="number" onChange={handleInputGold} value={gold} />
            </GoldPriceContainer>
        </GoldContainer>
    )
}