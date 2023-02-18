export interface Country {
  name: string;
  region: string;
  area: number;
  independent: boolean;
}

export type Countries = Country[];

export enum Region {
  ALL = "All",
  OCEANIA = "Oceania",
}
