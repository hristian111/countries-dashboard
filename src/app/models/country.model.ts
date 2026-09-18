/** One country as served by countries.json. */
export interface Country {
  name: string;
  shortInfo: string;
  image: string;
  continent: string;
  capital: string;
  language: string;
  population: number;
  totalArea: number;
}