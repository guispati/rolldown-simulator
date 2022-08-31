import styled from "styled-components";
import shop from "../../../../assets/shop.png";

export const ShopContainer = styled.div`
    background: url(${shop});
    background-repeat: no-repeat;
    background-size: cover;
    width: 1370px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    height: 185px;

    > img {
        position: absolute;
        z-index: 0;
        bottom: 0;
        height: 100%;
    }
`;

export const ShopLine = styled.div`
    display: flex;
    gap: 0.375rem;
    height: 100%;
`;

export const ShopButtons = styled.div`
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;

    button {
        width: 226px;
        height: 82px;
        border: 0;
        margin: 0px 10px;
        position: relative;
    }
`;