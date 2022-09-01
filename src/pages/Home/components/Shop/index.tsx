import { RefreshButton } from "./components/Buttons/RefreshButton";
import { UpgradeButton } from "./components/Buttons/UpgradeButton";
import { Champions } from "./components/Champions";
import { Level } from "./components/Level";
import { Odds } from "./components/Odds";
import { ShopButtons, ShopContainer, ShopLine } from "./styles";

export function Shop() {
    return (
        <ShopContainer>
            <ShopLine>
                <Level level={1} />
                <Odds />
                <ShopButtons>
                    <UpgradeButton isActive={true} />
                    <RefreshButton isActive={true} />
                </ShopButtons>
                <Champions />
            </ShopLine>
        </ShopContainer>
    );
}