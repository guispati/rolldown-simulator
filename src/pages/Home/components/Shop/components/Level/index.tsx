import { LevelContainer, LevelInfo } from "./styles";

interface LevelProps {
    level: number;
}

export function Level({ level }: LevelProps) {
    return (
        <LevelContainer>
            <LevelInfo>
                <span>Lvl. {level}</span>
            </LevelInfo>
        </LevelContainer>
    );
}