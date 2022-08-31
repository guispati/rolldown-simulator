import styled from "styled-components";
import hud from '../../../../assets/hud.png';

interface GoldIconProps {
    size: number;
}

export const GoldIcon = styled.i<GoldIconProps>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background: url(${hud});
    background-position: -346px -398px;
`;