export const GROUPS = {
  group1: "#0000ff", 
  group2: "#ff0000"
};

export function roundTo(value: number, decimals: number) : number {
  const coef = Math.pow(10, decimals);
  return Math.floor(value * coef) / coef;
}
export function parseFloatSafe(value: any) : number {
  let result = parseFloat(value.toString());
  return isNaN(result) ? 0.0 : result;
}
export function removeFrom(array: Array<any>, index: number) : Array<any> {
  const result = array.slice(0, index).concat(array.slice(index + 1));
  return result;
}