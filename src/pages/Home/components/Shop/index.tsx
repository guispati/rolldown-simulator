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
    return (
        <ShopContainer>
            <ShopLine>
                <Level />
                <Odds />
                <Gold />
                <ShopButtons>
                    <UpgradeButton />
                    <RefreshButton />
                </ShopButtons>
                <Champions />
            </ShopLine>
        </ShopContainer>
    );
}