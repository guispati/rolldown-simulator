import { useContext } from "react";
import { ShopContext } from "../../../../contexts/ShopContext";
import { BenchChampion } from "./components/BenchChampion";
import { BenchContainer } from "./styles";

export function Bench() {
    const { bench } = useContext(ShopContext);

    return (
        <BenchContainer>
            {bench.map(champion => {
                return (
                    <BenchChampion champion={champion} />
                )
            })}
        </BenchContainer>
    );
}