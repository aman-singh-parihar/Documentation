// Example 1
const getName = () => 'Aman';
module.exports = {id:2, name:'world',refer : getName};
console.log(module.exports);

// Example 2
const getName = () => 'Aman';
const getLocation =() => 'London';
module.exports = 
{   id:2, 
    name:'world',
    Name : getName,
    Location: getLocation
};
