import styled from "styled-components";

export const GoldPriceContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    padding-right: 15px;

    input {
        border: 0;
        background: transparent;
        width: 2rem;
        color: #fff;

        cursor: text;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
`;