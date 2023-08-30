interface FieldError {
  field: string;
  message: string;
}

export interface ICommonErrorResponse {
  message: string;
  code: string;
  fieldErrors: FieldError[] | null;
}
