export interface FailedRequestItem {
  resolve: (token?: string | null) => void;
  reject: (error: unknown) => void;
}
