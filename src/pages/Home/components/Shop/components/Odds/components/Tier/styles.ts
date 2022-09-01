import styled from "styled-components";
import hud from "../../../../../../../../assets/hud.png";

const handleTierColor = (tier: number) => {
    switch (tier) {
        case 2:
            return "#42BA5A";
        case 3:
            return "#42C3FF";
        case 4:
            return "#AA09A4";
        case 5:
            return "#FC9000";
        default:
            return "#FFF";
    }
}

interface TierContainerProps {
    tier: number;
}

export const TierContainer = styled.div<TierContainerProps>`
    display: flex;
    align-items: center;
    gap: 3px;
    color: ${({tier}) => handleTierColor(tier)};
    
    &:first-child {
        padding-left: 35px;
    }

    &:last-child {
        padding-right: 35px;
    }
`;

const handleTierIcon = (tier: number) => {
    switch (tier) {
        case 1:
            return "-272px -955px";
        case 2:
            return "-284px -955px";
        case 3:
            return "-300px -955px";
        case 4:
            return "-318px -955px";
        case 5:
            return "-335px -955px";
    }
}

interface TierIconProps {
    tier: number;
}

export const TierIcon = styled.i<TierIconProps>`
    width: 10px;
    height: 10px;
    background: url(${hud});
    background-position: ${({tier}) => handleTierIcon(tier)};
`;