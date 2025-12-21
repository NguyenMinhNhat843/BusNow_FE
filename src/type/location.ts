import { StopPointType } from "./stopPointType";

export type LocationType = {
  locationId: string;
  name: string;
  stopPoints: StopPointType[];
};
