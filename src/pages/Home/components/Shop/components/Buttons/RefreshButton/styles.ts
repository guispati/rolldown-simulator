import styled from "styled-components";
import { ButtonContainer } from "../styles";
import hud from '../../../../../../../assets/hud.png';

export const RefreshButtonContainer = styled(ButtonContainer)`
    background: url(${hud});
    background-position: -602px -206px;

    &:disabled {
        background: url(${hud});
        background-position: -1268px -206px;
    }

    &:not(:disabled):hover {
        background: url(${hud});
        background-position: -824px -206px;
    }
`;