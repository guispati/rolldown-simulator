import styled from "styled-components";

export const BenchContainer = styled.div`
    position: fixed;
    width: 1110px;
    bottom: 260px;
    left: 50%;
    transform: translate(-50%);
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(9, 1fr);
`;