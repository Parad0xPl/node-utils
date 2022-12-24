/**
 * Generate integer in [min, max] set
 * @param min minimal number
 * @param max maximal number
 * @returns number
 */
function random_between(min: number, max: number){
  max += 1;
  let diff = Math.random()*(max-min);
  diff = Math.trunc(diff);
  return min + diff;
}
