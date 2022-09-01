import styled from "styled-components";
import hud from "../../../../../../assets/hud.png";

export const OddsContainer = styled.div`
    position: absolute;
    bottom: 180px;
    background: url(${hud});
    height: 35px;
    width: 400px;
    background-position: -264px -977px;
    left: 196px;
    z-index: 0;
    display: flex;
    justify-content: space-between;
`;