import styled from "styled-components";
import traitsHud from '../../../../../../../../assets/traits-hud.png';
import hud from '../../../../../../../../assets/hud.png';

interface ChampionTileContainerProps {
    tier: number;
}

export const ChampionTileContainer = styled.div<ChampionTileContainerProps>`
    display: flex;
    z-index: 1;
    width: 216px;
    height: 163px;
    align-self: center;
    position: relative;
    background: url(${hud});
    ${props => props.tier === 0 && 'background-position: -464px -772px;'} /* No tile */
    ${props => props.tier === 1 && 'background-position: -20px -430px;'}

    > img {
        width: 204px;
        height: 118px;
        position: absolute;
        top: 6px;
        left: 4px;
    }

    &:hover {
        background: url(${hud});
        ${props => props.tier === 0 && 'background-position: -464px -772px;'} /* No tile */
        ${props => props.tier === 1 && 'background-position: -243px -430px;'}
        cursor: pointer;
    }
`;

export const Traits = styled.div`
    width: 100%;
    z-index: 3;
    position: absolute;
    bottom: 40px;
    left: 5px;
`;

export const Trait = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    img {
        width: 15px;
    }
`;

export const TraitBg = styled.div`
    background: url(${traitsHud});
    width: 22px;
    height: 24px;
    background-position: -398px -5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ChampionInfo = styled.div`
    position: absolute;
    bottom: 10px;
    left: 5px;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;