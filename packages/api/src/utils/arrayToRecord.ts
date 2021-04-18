/** Converts an array of strings to a Record / ObjectMap */
export default function arrayToRecord<T extends string>(
  arr: T[]
): Record<string, T> {
  return arr.reduce(
    (out, item) => ({ ...out, [item]: item }),
    {} as Record<string, T>
  );
}
