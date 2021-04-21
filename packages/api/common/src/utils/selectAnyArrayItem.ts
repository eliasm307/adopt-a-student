export default function selectAnyArrayItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
