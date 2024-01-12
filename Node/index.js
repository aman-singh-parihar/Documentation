// Example 1
const user = require('./user');
let name = user.refer();
let id = user.id;
let world = user.name;
console.log(id);
console.log(name);
console.log(world);

//Example 2 destructuring
const {Name, Location} = require('./user');
const name = Name();
const location = Location();
console.log(`${name} and ${location}`);
