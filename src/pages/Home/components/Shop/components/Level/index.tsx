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
    const xp_text = (level === 9) ? "Max" : xp + "/" + EXP_THRESHOLD[level];
    return (
        <LevelContainer>
            <LevelInfo>
                <span>Lvl. {level}</span>
                <span>{xp_text}</span>
            </LevelInfo>
        </LevelContainer>
    );
}