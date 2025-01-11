"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

const LanguageContext = createContext({ lang: 'en', setLang: (lang: string) => { } });

export const LanguageProvider = ({ children, defaultLang = 'en' }: { children: ReactNode, defaultLang?: string }) => {
    const [lang, setLang] = useState(defaultLang);
    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};