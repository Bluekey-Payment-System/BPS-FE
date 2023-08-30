export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export interface ICommonErrorResponse {
  message: string;
  code: string;
  fieldErrors: {
    field: string;
    message: string;
  }[] | null;
}
