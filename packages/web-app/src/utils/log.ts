import isProductionEnvironment from './isProductionEnvironment';

/** log function for non production environments only */
export default function log(...args: any[]) {
  if (isProductionEnvironment()) return;

  console.log(...args);
}
