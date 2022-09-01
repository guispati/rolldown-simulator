import styled from "styled-components";
import { ButtonContainer } from "../styles";
import hud from '../../../../../../../assets/hud.png';

export const UpgradeButtonContainer = styled(ButtonContainer)`
    background: url(${hud});
    background-position: -1046px -291px;

    &:disabled {
        background: url(${hud});
        background-position: -1268px -291px;
    }

    &:not(:disabled):hover {
        background: url(${hud});
        background-position: -824px -291px;
        cursor: pointer;
    }
`;