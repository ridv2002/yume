/*
  Implementar no header da rota futuramente


  request.headers["accept-language"]

  dentro das rotas

*/


import { ptBR } from "./locales/pt-BR";

const translations = {
  "pt-BR" : ptBR
}

type Language = keyof typeof translations
type TranslationKey = keyof typeof ptBR.user

// export function getLanguage(acceptLanguage?: string): Language {
//   // const languages = acceptLanguage?.toLowerCase() ?? ""
//
//   // if(languages.startsWith("en")) return "en-US"
//
//   return "pt-BR"
// }


export function translate(
  language: Language,
  key: TranslationKey
) {
  return translations[language].user[key]
}
