import { useContext } from "react";
import { GoldPrice } from "../../../../../../components/GoldPrice";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { GoldContainer } from "./styles";

export function Gold() {
    const { gold } = useContext(ShopContext);
    return (
        <GoldContainer>
            <GoldPrice price={gold} />
        </GoldContainer>
    )
}