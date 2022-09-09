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
        opacity: 0.9;
        &:hover {
            box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
            opacity: 1;
        }
    }

`;

interface ChampionNameProps {
    tier: number;
}

export const ChampionName = styled.span<ChampionNameProps>`
    position: absolute;
    bottom: -20px;
    width: 80%;
    border-radius: 10px;
    text-align: center;
    font-size: 0.75rem;
    ${props => props.tier > 0 && props.tier <= 5 ? `background: url(${hud});` : `background: url(${dragonHud});`}
    ${props => props.tier === 1 && 'background-position: -20px -560px'}
    ${props => props.tier === 2 && 'background-position: -470px -560px;'}
    ${props => props.tier === 3 && 'background-position: -20px -740px;'}
    ${props => props.tier === 4 && 'background-position: -470px -740px;'}
    ${props => props.tier === 5 && 'background-position: -20px -900px;'}
    ${props => props.tier === 6 && 'background-position: -20px -980px;'}
    ${props => props.tier === 7 && 'background-position: -10px -130px;'}
    ${props => props.tier === 8 && 'background-position: -10px -300px;'}
`;

const ChampionStar = styled.span`
    position: absolute;
    top: 83px;
    height: 23px;
    background: url(${hud});
`;

export const Champion1Star = styled(ChampionStar)`
    width: 13px;
    background: url(${hud});
    background-position: -1564px -548px;
`;

export const Champion2Star = styled(ChampionStar)`
    width: 22px;
    background: url(${hud});
    background-position: -1537px -548px;
`;

export const Champion3Star = styled(ChampionStar)`
    width: 31px;
    background: url(${hud});
    background-position: -1499px -548px;
`;