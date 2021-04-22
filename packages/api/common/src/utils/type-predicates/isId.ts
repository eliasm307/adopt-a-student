export default function isId(data: any): data is string {
  return typeof data === "string";
}
