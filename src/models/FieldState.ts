export interface FieldState<T> {
  value: T;
  error: boolean;
  message?: string;
}

export const initialFieldState: FieldState<string> = { value: '', error: false };
