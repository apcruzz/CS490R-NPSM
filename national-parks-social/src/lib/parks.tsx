import nationalParksData from "../data/national-parks.json";

export type Park = {
  name: string;
  state: string;
  position: [number, number];
  image: string;
};

function normalizeImagePath(image: string) {
  return image.startsWith("public/") ? `/${image.replace("public/", "")}` : image;
}

export const nationalParks = (nationalParksData as Park[]).map((park) => ({
  ...park,
  image: normalizeImagePath(park.image),
}));
