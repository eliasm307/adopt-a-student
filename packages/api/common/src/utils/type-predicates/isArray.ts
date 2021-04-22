export default function isArray<T>(data: any): data is T[] {
  return Array.isArray(data as T[]);
}
