import { useEffect, useState } from 'react';
import { LocaleType } from '../locales/types';

const useLanguage = (pLanguage:string) => {
    const [language, setLanguage] = useState<LocaleType>({} as LocaleType);

    useEffect(() => {
        const fetchLanguage = async () => {
            const response = await import(`../locales/${pLanguage}.json`);
            setLanguage(response.default);
        }

        fetchLanguage();
    }, [pLanguage]);

    return language;
}

export default useLanguage;