import styled from "styled-components";
import { ButtonContainer } from "../styles";
import hud from '../../../../../../../assets/hud.png';

export const RefreshButtonContainer = styled(ButtonContainer)`
    background: url(${hud});
    background-position: -602px -205px;

    &:hover {
        background: url(${hud});
        background-position: -824px -205px;
    }
`;