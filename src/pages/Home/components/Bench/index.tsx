import { useContext } from "react";
import { ShopContext } from "../../../../contexts/ShopContext";
import { BenchChampion } from "./components/BenchChampion";
import { BenchContainer } from "./styles";
import { v4 as uuidv4 } from 'uuid';

export function Bench() {
    const { bench } = useContext(ShopContext);

    return (
        <BenchContainer>
            {bench.map(champion => {
                return (
                    <BenchChampion key={uuidv4()} champion={champion} />
                )
            })}
        </BenchContainer>
    );
}