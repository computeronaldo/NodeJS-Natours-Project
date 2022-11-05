const EventEmitter = require('events');

class Tex extends EventEmitter {
    constructor() {
      super();
    }
  }
  
const myEmitter = new Tex();

const start = Date.now();

setTimeout(() => {
   myEmitter.emit('Dang');
   console.log(`In: ${Date.now() - start}`);
}, 3000);

myEmitter.on('Dang', () => {
    console.log('Fuck');
});

console.log(`Out: ${Date.now() - start}`);