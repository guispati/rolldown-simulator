import { TierContainer, TierIcon } from "./styles";

interface TierProps {
    tier: number;
    odd: number;
}

export function Tier({ tier, odd }: TierProps) {
    return (
        <TierContainer tier={tier}>
            <TierIcon tier={tier} />
            <span>{odd}%</span>
        </TierContainer>
    );
}