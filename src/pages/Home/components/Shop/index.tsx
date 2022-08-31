import { RefreshButton } from "./components/Buttons/RefreshButton";
import { UpgradeButton } from "./components/Buttons/UpgradeButton";
import { Champions } from "./components/Champions";
import { ShopButtons, ShopContainer, ShopLine } from "./styles";

export function Shop() {
    return (
        <ShopContainer>
            <ShopLine>
                <ShopButtons>
                    <UpgradeButton isActive={false} />
                    <RefreshButton isActive={true} />
                </ShopButtons>
                <Champions />
            </ShopLine>
        </ShopContainer>
    );
}