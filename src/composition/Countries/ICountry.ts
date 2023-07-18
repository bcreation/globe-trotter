export interface Country {
  name
  code
  capital
  currencies
  emoji
  phones
  languages: Language
}
export interface Language {
  name
}