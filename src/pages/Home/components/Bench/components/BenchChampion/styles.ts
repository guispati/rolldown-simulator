import styled from "styled-components";
import hud from "../../../../../../assets/hud.png";
import dragonHud from '../../../../../../assets/hud-dragons.png';

export const BenchChampionContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;

    > img {
        border-radius: 50%;
        width: 80%;
    }
`;

interface ChampionNameProps {
    tier: number;
}

export const ChampionName = styled.span<ChampionNameProps>`
    position: absolute;
    bottom: -22px;
    width: 80%;
    border-radius: 10px;
    text-align: center;
    ${props => props.tier > 0 && props.tier <= 5 ? `background: url(${hud});` : `background: url(${dragonHud});`}
    ${props => props.tier === 1 && 'background-position: -20px -560px'}
    ${props => props.tier === 2 && 'background-position: -470px -560px;'}
    ${props => props.tier === 3 && 'background-position: -20px -740px;'}
    ${props => props.tier === 4 && 'background-position: -470px -740px;'}
    ${props => props.tier === 5 && 'background-position: -20px -900px;'}
    ${props => props.tier === 8 && 'background-position: -10px -130px;'}
    ${props => props.tier === 10 && 'background-position: -10px -300px;'}
`;

interface ChampionStarProps {
    tier: number;
}

export const ChampionStar = styled.span<ChampionStarProps>`
    position: absolute;
    top: -34px;
    left: 6px;
    width: 105px;
    height: 30px;
    background: url(${hud});
    ${props => props.tier === 1 && 'background-position: -1642px -60px;'}
    ${props => props.tier === 2 && 'background-position: -1642px -30px;'}
    ${props => props.tier === 3 && 'background-position: -1642px 0;'}
`;