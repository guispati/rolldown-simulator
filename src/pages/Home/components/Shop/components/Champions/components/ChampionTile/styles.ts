import styled from "styled-components";
import traitsHud from '../../../../../../../../assets/traits-hud.png';
import hud from '../../../../../../../../assets/hud.png';
import dragonHud from '../../../../../../../../assets/hud-dragons.png';

interface ChampionTileContainerProps {
    tier: number;
}

export const ChampionTileContainer = styled.div<ChampionTileContainerProps>`
    display: flex;
    width: 216px;
    height: 163px;
    align-self: center;
    position: relative;
    ${props => props.tier >= 0 && props.tier <= 5 ? `background: url(${hud});` : `background: url(${dragonHud});`}
    ${props => props.tier === 0 && 'background-position: -464px -772px;'} /* No tile */
    ${props => props.tier === 1 && 'background-position: -20px -430px;'}
    ${props => props.tier === 2 && 'background-position: -465px -430px;'}
    ${props => props.tier === 3 && 'background-position: -20px -600px;'}
    ${props => props.tier === 4 && 'background-position: -465px -600px;'}
    ${props => props.tier === 5 && 'background-position: -20px -770px;'}
    ${props => props.tier === 8 && 'background-position: -3px 1px;'}
    ${props => props.tier === 10 && 'background-position: -3px -166px;'}

    &:hover {
        ${props => props.tier >= 0 && props.tier <= 5 ? `background: url(${hud});` : `background: url(${dragonHud});`}
        ${props => props.tier === 0 && 'background-position: -464px -772px;'} /* No tile */
        ${props => props.tier === 1 && 'background-position: -243px -430px;'}
        ${props => props.tier === 2 && 'background-position: -688px -430px;'}
        ${props => props.tier === 3 && 'background-position: -243px -600px;'}
        ${props => props.tier === 4 && 'background-position: -688px -600px;'}
        ${props => props.tier === 5 && 'background-position: -243px -770px;'}
        ${props => props.tier === 8 && 'background-position: -221px 1px;'}
        ${props => props.tier === 10 && 'background-position: -221px -166px;'}
        cursor: pointer;
    }
`;

interface ChampionImageProps {
    disabled: boolean;
}

export const ChampionImage = styled.img<ChampionImageProps>`
    width: 204px;
    height: 118px;
    position: absolute;
    top: 6px;
    left: 4px;
    z-index: -1;
    ${props => props.disabled && "filter: grayscale(100%);"}
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