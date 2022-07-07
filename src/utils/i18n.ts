import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "ra-language-english";
import de from "ra-language-german";

const translations = { en, de };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  "en"
);
