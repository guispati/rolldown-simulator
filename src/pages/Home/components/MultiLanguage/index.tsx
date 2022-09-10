import * as Popover from '@radix-ui/react-popover';
import { LOCALES } from '../../../../data/constants';
import useImage from '../../../../hooks/useImage';
import { MultiLanguageOpener, MultiLanguagePopoverContainer } from './styles';
import { v4 as uuidv4 } from 'uuid';
import { useContextSelector } from 'use-context-selector';
import { ShopContext } from '../../../../contexts/ShopContext';

export function MultiLanguage() {
    const locales = LOCALES;

    const changeLanguage = useContextSelector(ShopContext, (context) => {
        return context.changeLanguage;
    });
    const language = useContextSelector(ShopContext, (context) => {
        return context.language;
    });

    function handleChangeLanguage(locale: string) {
        changeLanguage(locale);
    }

    return (
        <Popover.Root>
            <MultiLanguageOpener asChild>
                <img src={useImage(language, 'flag')} />
            </MultiLanguageOpener>
            
            <Popover.Portal>
            <MultiLanguagePopoverContainer>
                <Popover.Arrow />
                {locales.map(locale => (
                    <img key={uuidv4()} src={useImage(locale, 'flag')} onClick={() => handleChangeLanguage(locale)} />
                ))}
            </MultiLanguagePopoverContainer>
        </Popover.Portal>
        </Popover.Root>
    );
}