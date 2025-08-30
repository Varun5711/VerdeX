export function parseCSV(text: string): string[][] {
  return text
    .trim()
    .split("\n")
    .map((line) => line.split(","));
}
