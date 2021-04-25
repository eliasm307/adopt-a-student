function isProductionEnvironment(): boolean {
  // console.trace(__filename);
  // ssr
  if (typeof window === "undefined") return true;

  // local production serve port
  if (/localhost:9000/i.test(window.location.href)) return true;

  // local dev
  if (/localhost/i.test(window.location.href)) return false;

  return true;
}

// only need to call the function once I think
const result = isProductionEnvironment();

export default function isProductionEnvironmentValue() {
  return result;
}
