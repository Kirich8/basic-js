const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  let stack = [];

  if (!Array.isArray(arr)) {
    throw Error('\'arr\' parameter must be an instance of the Array!');
  }

  arr.forEach((item, index) => {
    if (item == '--discard-next') {
      return;
    };

    if (arr[index - 1] == '--discard-next') {
      return;
    };

    if (arr[index] == '--discard-prev' && arr[index - 2] == '--discard-next') {
      return;
    };

    if (item == '--double-next') {
      if (index + 1 < arr.length) {
        stack.push(arr[index + 1]);
      };
    } else if (item == '--double-prev') {
      if (index > 0) {
        stack.push(stack[index - 1]);
      }
    } else if (item == '--discard-prev') {
      stack.pop();
    } else {
      stack.push(item);
    };
  });

  stack = stack.filter(item => typeof item !== 'undefined');

  return stack;
}

module.exports = {
  transform
};
