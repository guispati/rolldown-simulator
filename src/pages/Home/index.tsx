import { ShopContextProvider } from "../../contexts/ShopContext";
import { Shop } from "./components/Shop";
import { HomeContainer } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <ShopContextProvider>
                <Shop />
            </ShopContextProvider>
        </HomeContainer>
    )
}