import { ShopContext } from "../../../../contexts/ShopContext";
import { BenchChampion } from "./components/BenchChampion";
import { BenchContainer } from "./styles";
import { v4 as uuidv4 } from 'uuid';
import { useContextSelector } from "use-context-selector";

export function Bench() {
    const bench = useContextSelector(ShopContext, (context) => {
        return context.bench;
    });

    return (
        <BenchContainer>
            {bench.map((champion, index) => {
                return (
                    <BenchChampion id={uuidv4()} key={uuidv4()} champion={champion} index={index} />
                )
            })}
        </BenchContainer>
    );
}