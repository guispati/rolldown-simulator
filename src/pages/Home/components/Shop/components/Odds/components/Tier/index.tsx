import { TierContainer, TierIcon } from "./styles";

interface TierProps {
    tier: number;
}

export function Tier({ tier }: TierProps) {
    return (
        <TierContainer tier={tier}>
            <TierIcon tier={tier} />
            <span>75%</span>
        </TierContainer>
    );
}