import { useContextSelector } from "use-context-selector";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { EXP_THRESHOLD } from "../../../../../../data/constants";
import { LevelContainer, LevelInfo } from "./styles";

export function Level() {
    const level = useContextSelector(ShopContext, (context) => {
        return context.level;
    });
    const xp = useContextSelector(ShopContext, (context) => {
        return context.xp;
    });
    const changeLevel = useContextSelector(ShopContext, (context) => {
        return context.changeLevel;
    });
    const xp_text = (level === 9) ? "Max" : xp + "/" + EXP_THRESHOLD[level];

    function handleInputLevel(event: React.ChangeEvent<HTMLInputElement>) {
        changeLevel(parseInt(event.target.value));
    }
    
    return (
        <LevelContainer>
            <LevelInfo>
                <span>Lvl. <input type="number" onChange={handleInputLevel} value={level} /></span>
                <span>{xp_text}</span>
            </LevelInfo>
        </LevelContainer>
    );
}