import nationalParksData from "../data/national-parks.json";

export type Park = {
  name: string;
  state: string;
  position: [number, number];
  image: string;
};

export const nationalParks = nationalParksData as Park[];
