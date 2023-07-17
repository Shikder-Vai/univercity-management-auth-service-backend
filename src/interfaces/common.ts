import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total?: number | null;
  };
  data: T;
};
