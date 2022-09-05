import { ShopContextProvider } from "../../contexts/ShopContext";
import { Bench } from "./components/Bench";
import { Shop } from "./components/Shop";
import { HomeContainer } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <ShopContextProvider>
                <Bench />
                <Shop />
            </ShopContextProvider>
        </HomeContainer>
    )
}