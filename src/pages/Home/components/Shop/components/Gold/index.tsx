import { useContextSelector } from "use-context-selector";
import { GoldIcon } from "../../../../../../components/GoldIcon/styles";
import { GoldPriceContainer } from "../../../../../../components/GoldPrice/styles";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { GoldContainer } from "./styles";

export function Gold() {
    const gold = useContextSelector(ShopContext, (context) => {
        return context.gold;
    });

    const changeGold = useContextSelector(ShopContext, (context) => {
        return context.changeGold;
    });

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