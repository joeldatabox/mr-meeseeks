export function isNullOrUndefined(...value: any[]): boolean {
  if (value === null || value === undefined) return true;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (value[i] === null || value[i] === undefined) && result;
  }
  return result;
}

export function isNotNullOrUndefined(...value: any[]): boolean {
  if (value === null || value === undefined) return false;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (!(value[i] === null || value[i] === undefined)) && result;
  }
  return result;
}

export function isEmpty(value: any): boolean {
  if (isNullOrUndefined(value)) {
    return true;
  }
  if (value.length > 0) {
    return false;
  }
  return true;
}
