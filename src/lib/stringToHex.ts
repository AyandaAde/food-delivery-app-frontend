export function stringToHex(str: string) {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const hexValue = charCode.toString(16);

    //* Pad with zeros to endure two digit representation of hex values.
    hex += hexValue.padStart(2, "0");
  }
  return hex;
}
