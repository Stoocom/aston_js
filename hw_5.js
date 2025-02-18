    // -------------------
    // 1 Хомяковая ферма

function Hamster() { 
    this.food = [];
 }

Hamster.prototype.food = [ ]; // пустой "живот"

Hamster.prototype.found = function(something) {
  this.food.push(something);
};

// Создаём двух хомяков и кормим первого

speedy = new Hamster();
lazy = new Hamster();

speedy.found("яблоко");
speedy.found("орех");

console.log(speedy.food.length); // 2
console.log(lazy.food.length);   // 0 

// отсутствовала привязка к this (строка 5), иначе создается открытое статическое поле самого класса

    // -------------------
    // 2 Решить несколькими способами.

class Animal {
    constructor(name) {
        this.name = name;
    }
}
      
class Rabbit extends Animal {
    constructor(name) {
        this.name = name;
        this.created = Date.now();
    }
}
      
let rabbit = new Rabbit("Белый кролик"); // Error: this is not defined

console.log(rabbit);
      
      // в чем ошибка? как исправить? Можно делать что угодно.

// Решение 1
class Rabbit1 extends Animal {
    constructor(name) {
        super(name);
        this.created = Date.now();
    }
}

// Решение 2
class Rabbit2 extends Animal {
    constructor() {
        super();
        this.created = Date.now();
    }
}

// Решение 3
class Rabbit3 extends Animal {
    constructor(...arg) {
        super(...arg);
        this.created = Date.now();
    }
}


    // -------------------
    // 3

class A {
    constructor() {

    }
    arrFunc = () => {
        console.log('wtf', this === i) 
    }
}

var i = new A();
console.log(i);
i.arrFunc(); // wtf true

console.log(i.hasOwnProperty('arrFunc')); // true

// при создании класса объекта класса А в каждый экземпляр объекта добавляется поле arrFunc (с функцией, котороая не вызывается).
// При вызове функции arrFunc у стрелочной функции this обращается к констексту вызова через оператор New (объект i)
// hasOwnProperty выводит все открытые поля, поэтому поле arrFunc показывает, что есть (поле arrFunc не является методом!)

    // -------------------
    // 4 Создать приватное поле в функции-конструкторе, создать геттер и сеттер для него.
    
function PrivateNumber() {
    let private = 12;
    
    Object.defineProperty(this, "getPrivate", {
      get() {
        return private;
      },
      set(value) {
        private = value;
      }
    })
  }

let b = new PrivateNumber();
console.log(b.getPrivate);
b.getPrivate = 15;
console.log(b.getPrivate);

    // -------------------
    // 5 Написать функцию, которая вернет массив с первой парой чисел, сумма которых равна total:

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let total = 56;

function getPairNumbersToSumTotal(arr) {
    while (arr.length > 2) {
        for (let i = arr.length-2; i >= 0; i--) {
            if (arr[arr.length-1] + arr[i] === total) {
                return [arr[arr.length-1], arr[i]];
            }
        }
        arr.pop();
    }
    return `Чисел, сумма которых равна ${total}, не найдено`;
}

console.log(getPairNumbersToSumTotal(arr));
