const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(choice = true) {
    this.reverse = !choice;
    this.alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.alphabet = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8,
      J: 9,
      K: 10,
      L: 11,
      M: 12,
      N: 13,
      O: 14,
      P: 15,
      Q: 16,
      R: 17,
      S: 18,
      T: 19,
      U: 20,
      V: 21,
      W: 22,
      X: 23,
      Y: 24,
      Z: 25,
    };
  }

  encrypt(text, key) {
    if (arguments.length < 2 || !text || !key) {
      throw new Error('Incorrect arguments!');
    };

    const upperText = text.toUpperCase();
    const subtext = upperText.replace(/[^a-z]/ig, "");
    key = key.toUpperCase();

    let word = '';

    for (let i = 0; i < subtext.length; i++) {
      word += this.alph[(this.alphabet[subtext[i]] + this.alphabet[key[i % key.length]]) % this.alph.length];
    };

    let i = 0;

    while (i < text.length) {
      if (!this.alph.includes(upperText[i])) {
        word = word.substr(0, i) + upperText[i] + word.substr(i, text.length);
      };

      i++;
    };

    if (this.reverse) {
      word = word.split('').reverse().join('');
    };

    return word;
  }

  decrypt(text, key) {
    if (arguments.length < 2 || !text || !key) {
      throw new Error('Incorrect arguments!');
    };

    const upperText = text.toUpperCase();
    const subtext = upperText.replace(/[^a-z]/ig, "");
    key = key.toUpperCase();

    let word = '';

    for (let i = 0; i < subtext.length; i++) {
      word += this.alph[(this.alphabet[subtext[i]] - this.alphabet[key[i % key.length]] + this.alph.length) % this.alph.length];
    };

    let i = 0;

    while (i < text.length) {
      if (!this.alph.includes(upperText[i])) {
        word = word.substr(0, i) + upperText[i] + word.substr(i, text.length);
      };

      i++;
    };

    if (this.reverse) {
      word = word.split('').reverse().join('');
    };

    return word;
  }
}

module.exports = {
  VigenereCipheringMachine
};
