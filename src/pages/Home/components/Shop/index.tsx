import { useContext, useState } from "react";
import { ShopContext } from "../../../../contexts/ShopContext";
import { RefreshButton } from "./components/Buttons/RefreshButton";
import { UpgradeButton } from "./components/Buttons/UpgradeButton";
import { Champions } from "./components/Champions";
import { Gold } from "./components/Gold";
import { Level } from "./components/Level";
import { Odds } from "./components/Odds";
import { ShopButtons, ShopContainer, ShopLine } from "./styles";

export function Shop() {
    const { xp, level, gold} = useContext(ShopContext);

    return (
        <ShopContainer>
            <ShopLine>
                <Level />
                <Odds />
                <Gold />
                <ShopButtons>
                    <UpgradeButton isActive={true} />
                    <RefreshButton isActive={true} />
                </ShopButtons>
                <Champions />
            </ShopLine>
        </ShopContainer>
    );
}