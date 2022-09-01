import styled from "styled-components";
import hud from "../../../../../../assets/hud.png";

export const GoldContainer = styled.div`
    background: url(${hud});
    background-position: -402px -215px;
    position: absolute;
    bottom: 180px;
    left: 45%;
    height: 53px;
    width: 194px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;

    > div {
        gap: 0.5rem;
    }
`;