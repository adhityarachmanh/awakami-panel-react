import 'react-i18next';

declare module 'react-i18next' {
  interface Resources {
    general: typeof import('../public/locales/id/general.json');
    login: typeof import('../public/locales/id/login.json');
  }
}