/**
 *
 * @param {Array} array Array to be modified.
 * @param {Number} index Index of item to be changed.
 * @param {*} value Replacement value.
 * @returns {Array} Returns modified array.
 */
export const replaceAt = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};
