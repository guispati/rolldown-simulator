import { useContext } from "react";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { ChampionTile } from "./components/ChampionTile";
import { ChampionsContainer } from "./styles";
import { v4 as uuidv4 } from 'uuid';

export function Champions() {
    const { store } = useContext(ShopContext);
    return (
        <ChampionsContainer>
            {store.map(shop => {
                return (
                    <ChampionTile key={uuidv4()} champion={shop} />
                )
            })}
        </ChampionsContainer>
    );
}