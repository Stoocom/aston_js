    // --------------------------------------------------------------------
    // Задание 1 – Создать объект workingObject всеми возможными способами;

const innerObject = { 'navy': 12 };
const middleArray = [ 1,2,3,innerObject ];
const workingObject = {
    a:middleArray 
};

// 1.1 Cоздание объекта через класс

class WorkingObject {
    constructor(array) {
        this.a = array
    }
};

const workingObject1 = new WorkingObject(middleArray);
// console.log('1.1 workingObject1', workingObject1);

// 1.2 Cоздание объекта через Object.create

const workingObject2 = Object.create({}, { a: {
    enumerable: true,
    value: middleArray,
}});
// console.log('1.2 workingObject2', workingObject2);

// 1.3 Cоздание объекта через Object.assign

const workingObject3 = Object.assign({ a: middleArray});
// console.log('1.3 workingObject3', workingObject3);


    // -----------------------------------------------------------------------
    // Задание 2 – Cкопировать объект workingObject всеми возможными способами; 

// 2.1 lodash

// const clone_1 = _.cloneDeep(workingObject);

// 2.2 JSON.parse/JSON.stringify

const clone_2 = JSON.parse(JSON.stringify(workingObject));
// console.log('clone_2', clone_2);

// 2.3 Создание собственной функции клонирования 

function deepClone(obj) {

    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Array) {
        let copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        let copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Ошибка клонирования");
}

let copy = deepClone(workingObject);
// console.log('copy', copy);

// 2.4 Прототип

function clone(obj) {
    const newObj = Object.create(Object.getPrototypeOf(obj));
    Object.defineProperties(
        newObj,
        Object.getOwnPropertyDescriptors(obj)
    );
    return newObj;
}

const workingObjectClone = clone(workingObject);
// console.log('workingObjectClone', workingObjectClone);



    // -------------------------------------------------------------------------------
    // Задание 3 – Создать функцию makeCounter всеми описанными и возможными способами;

// 1. Function Declaration 

function makeCounter () {
    let count = 0;
    return function () {
        return count++
    }
}

// let counter = makeCounter();
// console.log(counter());
// console.log(counter());

// 2. Function Expression

let makeCounter2 = function () {
    let count = 0;
    return function () {
        return count++
    }
}

// let counter2 = makeCounter2();
// console.log(counter2());
// console.log(counter2());

// 3. Функция-конструктор

function MakeCounter() {
    this.count = 0;
    this.counter = function() {
        this.count++;
    };
}

// const counter3 = new MakeCounter();
// counter3.counter();
// console.log(counter3.count);
// counter3.counter();
// console.log(counter3.count);

// 4. Arrow function

let makeCounter4 = () => {
    let count = 0;
    return () => {
        return count++
    }
}

// let counter4 = makeCounter4();
// console.log(counter4());
// console.log(counter4());


    // -------------------------------------------------------------------------------
    // Бонус Задание 1 – Написать функцию глубокого сравнения двух обьектов:

const obj1 = { 
    here: { is: "on", other: "3" }, 
    object: 5
};

 const obj2 = { 
    here: { is: "on", other: "3" }, 
    object: 5
 }; 

const deepEqual = (obj1, obj2) => {
    const objKeys1 = Object.keys(obj1);
    const objKeys2 = Object.keys(obj2);

    if (objKeys1.length !== objKeys2.length) return false;

    const isObject = (object) => {
        return object != null && typeof object === "object";
    };

    for (let key of objKeys1) {
        const value1 = obj1[key];
        const value2 = obj2[key];

        const isObjects = isObject(value1) && isObject(value2);

        if ((isObjects && !deepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
            return false;
        }
    }
    return true;
};

// console.log(deepEqual(obj1,obj2));


    // -------------------------------------------------------------------------------
    // Бонус Задание 2 – Развернуть строку в обратном направлении при помощи методов массивов: 

function reverseStr(str) {
    if (typeof str !== 'string') { 
        return new Error('При использовании функции reverseStr переменная str не является строкой!'); 
    }
    if (str.length <= 1) {
        return str;
    }
    return str.split('').reverse().join('');
}

// console.log(reverseStr('m'));



    // ----------------------
    // Задача на замыкание 1:

function createIncrement() {
    let value = 0;

    function increment(){                 
        value += 1;
        console.log(value);
    };

    const message = `Current value is ${value}`;

    function log(){
        console.log(message)
    };
    return [increment, log];
};

const [increment, log] = createIncrement();

// increment(); // 1
// increment(); // 2
// increment(); // 3

// log(); //"Current value is 0"        // почему не 3?

// Ответ - потому что вызов log не меняет переменную message, 
// переменной message было присвоено значение только один раз при вызове функции createIncrement, 
// которая и сформировала замыкание в своем лексическом окружении (Lexical Environment).



    // ----------------------
    // Задача на замыкание 2:

let group = getGroup();

// group[0](); // 10
// group[5](); // 10

function getGroup() {
    
  let students = [];
  let i = 0;
  while (i < 10) {
    students[i] = function() {
      console.log(i);
    };
    i++;
  }

  return students;
}

// Ответ - переменная i показывается в консоли каждый раз при вызове анонимной функции и
// обращается каждый раз в лексическое окружение где i равна 10 после всех операций по циклу while


    // ----------------------
    // Задача на замыкание 3:

var globalVar = 'global';
var outerVar = 'outer';

function outerFunc(outerParam) {
    function innerFunc(innerParam) {
        console.log(globalVar, outerParam, innerParam); // guess,outer,inner
    }
    return innerFunc;
}

const x = outerFunc(outerVar); // 1
outerVar = 'outer-2'; // 2
globalVar = 'guess'; // 3
x('inner1'); // 4

// Ответ
// на 1 итерации     globalVar = "global", outerVar = "outer"
// на 2 итерации     globalVar = "global", outerVar = "outer", но из-за замыкания значение outerVar не изменяется
// на 3 итерации     globalVar = "guess", outerVar = "outer", в замыкании нет переменной globalVar, поэтому 
                  // программа смотрит в лексическое окружение выше и доходит в конце в глобальное лексическое значение
// на 4 итерации     globalVar = "guess", outerVar = "outer", innerParam = "inner", добавляем новую переменную через параметр.

