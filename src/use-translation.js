import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const ko = require('./lang/lang.ko.json');
const en = require('./lang/lang.en.json');
const ja = require('./lang/lang.ja.json');
const zh = require('./lang/lang.zh.json');

const i18n = new I18n({
  ko,
  en,
  ja,
  zh
});

const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage;

export const useTranslation = () => {
  return {
    t : (scope) => i18n.t(scope)
  }
}
