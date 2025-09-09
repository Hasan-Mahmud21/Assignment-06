1) What is the difference between var, let, and const?

var: var is function-scoped. It is global and can overwrite.
Also, var is not preferred in modern JavaScript. We can change vars value inside a block too


let: Let we normally use when the value can change. For example, sum, count etc. It is limited to the block it is defined..We can not declare it multiple times...

const: const is like let but we usually use it the most. When the variable does not change frequently, we use it...


#### 2) What is the difference between map(), forEach(), and filter()? 

map():Creates a new array by transforming each element via a function. Returns the new array, doesn’t change the original array.
forEach():Executes a function for each element, we can access single element of an array using it
filter():Creates a new array with elements passing a test. Returns a filtered array, doesn’t change the original.

#### 3) What are arrow functions in ES6?

Arrow functions (=>) are short and simple, automatically returning single expressions. They use this from their surrounding code, unlike regular functions. They don’t have an arguments object and can’t be used to create objects. Great for callbacks and keeping this consistent.

#### 4) How does destructuring assignment work in ES6?
Destructuring unpacks array elements or object properties into variables. Arrays use position ([a, b] = [1, 2]), objects use property names ({x, y} = {x: 1, y: 2}). Simplifies accessing multiple values.

#### 5) Explain template literals in ES6. How are they different from string concatenation?
Template literals use backticks (`) for strings with ${expression} and multi-line support. Unlike concatenation (+), they’re readable, handle expressions naturally, and don’t need explicit \n for newlines. Ideal for dynamic or multi-line strings. We can make string dynamic using template literals...