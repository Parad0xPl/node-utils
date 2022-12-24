/**
 * Transform number to string padded with zeros
 * @param n number to transform
 * @param minimal_output_length how long should be string - default: 2
 * @returns string zero padded
 */
function zero_pad_number(n: number, minimal_output_length: number = 2): string{
  let txt = n.toString(10);
  return txt.padStart(minimal_output_length, "0");
}
