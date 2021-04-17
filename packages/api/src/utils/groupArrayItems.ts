// todo test
export default function groupArrayItems<T>(arr: T[], groupSize: number): T[][] {
  const roundedSize = Math.round(groupSize);

  // handle extreme cases
  if (roundedSize >= arr.length) return [arr];
  if (roundedSize <= 1) return arr.map((item) => [item]);

  // handle intermediate group size
  return arr.reduce((grouped: T[][], current) => {
    const currentGroup = grouped[grouped.length - 1];
    if (currentGroup.length === roundedSize) {
      // start new group
      return [...grouped, []];
    }

    // add to current group
    currentGroup.push(current);
    return grouped;
  }, [] as T[][]);
}
