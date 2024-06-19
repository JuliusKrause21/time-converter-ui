export interface FieldState<T> {
  value: T;
  error: boolean;
  message?: string;
}

export const initialFieldState = <T>(value: T): FieldState<T> => ({ value, error: false });
