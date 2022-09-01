import styled from "styled-components";

export const ButtonContainer = styled.button`
    width: 226px;
    height: 82px;
    border: 0;
    margin: 0px 10px;
    position: relative;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }

    &:hover {
        cursor: pointer;
    }
`;

export const ButtonInfo = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    text-align: left;
    position: absolute;
    left: 15px;
    top: 20px;
    display: flex;
    flex-direction: column;
`;