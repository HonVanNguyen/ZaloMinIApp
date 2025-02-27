export function tripUnit(value: string): number {
  return Number(value.match(/\d+/));
}

export function formatStringToD(value) {
  const number = parseFloat(value);
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 3,
    minimumFractionDigits: number % 1 === 0 ? 0 : 3,
    maximumFractionDigits: 3,
  }).format(number);

  return `${formattedNumber}`;
}

export function formatTextWithLineBreaks(text) {
  return text.replace(/\.\.\.|-/g, (match) => `\n${match}`);
}
