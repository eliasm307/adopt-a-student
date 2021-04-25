export function isArray<T>(data: any): data is T[] {
  return Array.isArray(data as T[]);
}

export function isTruthyString(data: any): data is string {
  return data && typeof data === "string";
}

export function isObject<T>(data: T | Partial<T>): data is T {
  return typeof data === "object";
}

export function isEmptyObject<T>(data: T | Partial<T>): data is T {
  return typeof data === "object" && !Object.keys(data).length;
}
