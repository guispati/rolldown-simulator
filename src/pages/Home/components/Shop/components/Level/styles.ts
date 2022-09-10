import styled from "styled-components";
import hud from "../../../../../../assets/hud.png";

export const LevelContainer = styled.div`
    position: absolute;
    bottom: 180px;
    background: url(${hud});
    height: 50px;
    width: 232px;
    background-position: -19px -956px;
    z-index: 1;
`;

export const LevelInfo = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 12px;
    left: 20px;
    font-size: 22px;
    width: 70%;
    align-items: center;

    span:last-child {
        font-size: 14px;
    }

    input {
        border: 0;
        background: transparent;
        width: 1.5rem;
        color: #fff;
        font-size: 22px;

        cursor: text;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
`;