export function extractPrice(priceText: string): number | null {
  if (!priceText) return null;

  const matches = priceText.replace(/,/g, "").match(/\d+(\.\d+)?/g);

  if (!matches || matches.length === 0) return null;

  const prices = matches.map((num) => parseFloat(num));

  return Math.max(...prices);
}
