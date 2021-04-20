export default function isProductionEnvironment(): boolean {
  // ssr
  if (typeof window === "undefined") return true;

  // local dev
  if (/localhost/i.test(window.location.href)) return false;

  return true;
}
