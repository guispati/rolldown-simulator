import { ShopContextProvider } from "../../contexts/ShopContext";
import { Bench } from "./components/Bench";
import { Shop } from "./components/Shop";
import { HomeContainer } from "./styles";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Question } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { InfoModal } from "./components/InfoModal";

export function Home() {
    return (
        <HomeContainer>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Question size={90} color="#fff" weight="fill" />
                </Dialog.Trigger>

                <InfoModal />
            </Dialog.Root>
            <ShopContextProvider>
                <DndProvider backend={HTML5Backend}>
                    <Bench />
                    <Shop />
                </DndProvider>
            </ShopContextProvider>
        </HomeContainer>
    )
}