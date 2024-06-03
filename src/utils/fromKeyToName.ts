export function fromKeyToName(key: string): string {
  const string = key.toLowerCase().split('-').join(' ');
  return string.charAt(0).toUpperCase() + string.slice(1);
}
