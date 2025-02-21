export function fpsToMS(fps: number) {
  return Math.floor(1000 / fps);
}

export function bound(num: number, lower: number, upper: number) {
  return Math.min(Math.max(num, lower), upper);
}

export function partition<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Partition size must be greater than 0.");
  }

  const out: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }

  return out;
}
