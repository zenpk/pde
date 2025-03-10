export function generateRandom(
  length: number,
  includeNumber: boolean,
  includeLowercase: boolean,
  includeUppercase: boolean,
  usable?: string
): string {
  console.log(length);
  console.log(includeNumber);
  console.log(includeLowercase);
  console.log(includeUppercase);
  console.log(`========== ${usable} ==========`);
  let pool = "";
  if (includeNumber) {
    pool += "0123456789";
  }
  if (includeLowercase) {
    pool += "abcdefghijklmnopqrstuvwxyz";
  }
  if (includeUppercase) {
    pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (usable && usable !== "") {
    pool = usable;
  }

  const poolLength = pool.length;
  let counter = 0;
  let result = "";
  while (counter < length) {
    result += pool.charAt(Math.floor(Math.random() * poolLength));
    counter += 1;
  }
  return result;
}
