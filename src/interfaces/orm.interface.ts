export interface BaseModel<T> {
  syncDB(callback?: (err: Error | null, result: boolean) => void): void;
}
