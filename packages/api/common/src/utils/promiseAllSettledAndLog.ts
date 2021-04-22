export default async function promiseAllSettledAndLog<T>(
  promises: Promise<T>[]
): Promise<PromiseSettledResult<T>[]> {
  const [...results] = await Promise.allSettled(promises);

  let resolvedCount = 0;

  results.forEach((result) => {
    if (result.status === "fulfilled") resolvedCount++;
  });

  const rejectedCount = results.length - resolvedCount;

  console.warn(
    __filename,
    `${resolvedCount}/${results.length} resolved, ${rejectedCount} rejected, results:`
    // results
  );
  return results;
}
