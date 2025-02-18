export type ErrorType =
  | 'General'
  | 'Raw'
  | 'Validation'
  | 'Unauthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'Conflict'
  | 'TooManyRequests'
  | 'InternalServerError'
  | 'BadGateway'
  | 'ServiceUnavailable'
  | 'GatewayTimeout';

export type ErrorValidation = {
  [key: string]: string;
};

export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
};

export type TUrl = {
  id: string;
  createdAt: Date;
  customName?: string | null;
  shortUrl: string;
  originalUrl: string;
};
