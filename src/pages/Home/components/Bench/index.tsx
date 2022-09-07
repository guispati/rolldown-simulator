import { useContext } from "react";
import { ShopContext } from "../../../../contexts/ShopContext";
import { BenchChampion } from "./components/BenchChampion";
import { BenchContainer } from "./styles";
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../../../../libs/dnd";

export function Bench() {
    const { bench } = useContext(ShopContext);
    
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BENCHCHAMPION
        }),
    )

    return (
        <BenchContainer ref={drop}>
            {bench.map(champion => {
                return (
                    <BenchChampion key={uuidv4()} champion={champion} />
                )
            })}
        </BenchContainer>
    );
}