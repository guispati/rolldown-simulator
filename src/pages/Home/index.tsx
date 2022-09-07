import { ShopContextProvider } from "../../contexts/ShopContext";
import { Bench } from "./components/Bench";
import { Shop } from "./components/Shop";
import { HomeContainer } from "./styles";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export function Home() {
    return (
        <HomeContainer>
            <ShopContextProvider>
                <DndProvider backend={HTML5Backend}>
                    <Bench />
                    <Shop />
                </DndProvider>
            </ShopContextProvider>
        </HomeContainer>
    )
}