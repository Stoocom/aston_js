// 5) Написать по примеру создания примитивных значений 
// (string, number, boolean, null, undefined, symbol, bigInt) 
// (если знаете несколько способов - использовать все)


let objSymbol = {
  [Symbol.toPrimitive](hint) {
    if (hint == "number") {
      return 10;
    }
    if (hint == "string") {
      return "hello";
    }
    return true;
  },
};
    
//  Числовой тип
const typeNumber1 = 5;
const typeNumber2 = Number("1");
const typeNumber3 = parseInt("20"); 
const typeNumber4 = parseFloat("20.123"); 
const typeNumber5 = +("20.123"); 
const typeNumber6 = +objSymbol;
const typeNumber7 = typeNumber3.valueOf();

console.log(typeof typeNumber1);
console.log(typeof typeNumber2);
console.log(typeof typeNumber3);
console.log(typeof typeNumber4);
console.log(typeof typeNumber5);
console.log(typeof typeNumber6);
console.log(typeof typeNumber7);

// Строковый тип
const typeString1 = "Строка";
const typeString2 = String(123);
const typeString3 = typeNumber1.toFixed(2);
const typeString4 = typeNumber1.toString();
const typeString5 = typeNumber1 + "";
const typeString6 = typeString1.valueOf();
const typeString7 = "" + objSymbol;


console.log(typeof typeString1);
console.log(typeof typeString2);
console.log(typeof typeString3);
console.log(typeof typeString4);
console.log(typeof typeString5);
console.log(typeof typeString6);
console.log(typeof typeString7);

// Булевый тип
const typeBoolean1 = true;
const typeBoolean2 = Boolean(2);
const typeBoolean3 = typeBoolean1.valueOf();
const typeBoolean4 = typeNumber1 > 0;
const typeBoolean5 = !!2;

console.log(typeof typeBoolean1);
console.log(typeof typeBoolean2);
console.log(typeof typeBoolean3);
console.log(typeof typeBoolean4);
console.log(typeof typeBoolean5);

// Null
const typeNull1 = null;
const typeNull2 = "12".match(/[aeiou]/gi);

console.log(typeNull1 === null);
console.log(typeNull2 === null);

// undefined
let typeUndefined1 = undefined;
let typeUndefined2;

console.log(typeof typeUndefined1);
console.log(typeof typeUndefined2);


// Symbol(новый тип в es6)
const typeSymbol1 = Symbol("id");
const typeSymbol2 = Symbol.for("id2");

console.log(typeof typeSymbol1);
console.log(typeof typeSymbol2);