import styled from "styled-components";
import * as Popover from '@radix-ui/react-popover';

export const MultiLanguageOpener = styled(Popover.Trigger)`
    width: 73px;
    height: 73px;
    border: 0;
    background: transparent;
    position: absolute;
    right: 40px;
    top: 8rem;
    cursor: pointer;
`;

export const MultiLanguagePopoverContainer = styled(Popover.Content)`
    background: rgba(32, 32, 36, 0.2);
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    width: 7rem;
    padding: 1rem;
    border-radius: 1000px;

    > img {
        cursor: pointer;
    }
`;