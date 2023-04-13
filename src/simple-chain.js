const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  array: [],

  getLength() {
    return this.array.length;
  },

  addLink(value) {
    if (typeof value !== 'undefined') {
      this.array.push(`( ${value} )`);
    } else {
      this.array.push(`(  )`);
    };

    return this;
  },

  removeLink(position) {
    if (typeof position !== 'number') {
      this.array = [];
      throw new Error('You can\'t remove incorrect link!');
    };

    if (position > this.array.length || position <= 0) {
      this.array = [];
      throw new Error('You can\'t remove incorrect link!');
    };

    this.array.splice(position - 1, 1);

    return this;
  },

  reverseChain() {
    this.array.reverse();

    return this;
  },

  finishChain() {
    const result = this.array.join('~~');

    this.array = [];

    return result;
  },
};

module.exports = {
  chainMaker
};
