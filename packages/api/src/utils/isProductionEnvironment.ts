export default function isProductionEnvironment() {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "production-test"
  );
}
