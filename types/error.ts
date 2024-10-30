export interface ApiError extends Error {
    code?: string;
    statusCode?: number;
  }