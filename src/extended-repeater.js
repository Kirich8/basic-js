const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let additionString = '';
  let result = '';

  options.separator = options.separator || '+';
  options.additionSeparator = options.additionSeparator || '|';
  options.additionRepeatTimes = options.additionRepeatTimes || 1;
  options.repeatTimes = options.repeatTimes || 1;

  for (let i = 1; i <= options.additionRepeatTimes; i++) {
    if (i !== options.additionRepeatTimes) {
      additionString = additionString + options.addition + options.additionSeparator;
    } else {
      if (typeof options.addition !== 'undefined') {
        additionString = additionString + options.addition;
      };
    };
  };

  for (let i = 1; i <= options.repeatTimes; i++) {
    if (i !== options.repeatTimes) {
      result = result + str + additionString + options.separator;
    } else {
      result = result + str + additionString;
    };
  };

  return result;
}

module.exports = {
  repeater
};
