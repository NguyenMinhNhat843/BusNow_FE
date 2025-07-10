interface RequestCreateRoute {
  originId: string;
  destinationId: string;
  duration: number;
  restAtDestination: number;
  repeatsDay?: number; // Cái này tính = (duration * 2 + rest) / 8 * 24h
  providerId?: string; // Lấy trong local storage ra
}

export interface RequestGetRoutes {
  page?: number;
  limit?: number;
}

export interface ResponseGetRoutes {
  routeId: string;
  origin: {
    locationId: string;
    name: string;
  };
  destination: {
    locationId: string;
    name: string;
  };
  duration: number;
  restAtDestination: number;
  repeatsDay: number;
  isActive: boolean;
  createdAt: string; // ISO date string
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export type { RequestCreateRoute };
