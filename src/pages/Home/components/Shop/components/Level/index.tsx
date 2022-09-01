import { useContext } from "react";
import { ShopContext } from "../../../../../../contexts/ShopContext";
import { EXP_THRESHOLD } from "../../../../../../data/constants";
import { LevelContainer, LevelInfo } from "./styles";

export function Level() {
    const { level, xp } = useContext(ShopContext);
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