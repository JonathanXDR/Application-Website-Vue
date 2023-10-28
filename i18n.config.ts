import de from '~/locales/de.json';
import en from '~/locales/en.json';
import fr from '~/locales/fr.json';
import it from '~/locales/it.json';

/** @type {import('i18n').Config} */
export default {
  legacy: false,
  locale: 'en',
  fallbackLocale: 'de',
  messages: {
    en,
    de,
    fr,
    it,
  },
};
