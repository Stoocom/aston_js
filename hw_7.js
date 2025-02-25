    // 1. ----------------------------------------------

const arr = [1, 4,,, 7, ,];

// some
const even = (element) => {
    return element % 7  === 0
};

Array.prototype.someCustom = function(callbackFn) {
    for (let i = 0; i <= this.length-1; i++) {
        if (callbackFn(this[i], i, this)) {
            return true
        }
    }
    return false
}

console.log(arr.some(even));
console.log(arr.someCustom(even));

// reduce
const reduceTest = (accumulator, currentValue) => {
    return accumulator + currentValue;
};

Array.prototype.reduceCustom = function(callbackFn, accum) {
    let accumulator = accum;
    this.forEach((elem) => {
        if (!elem) return
        accumulator = callbackFn(accumulator,elem);
    })
    return accumulator
}

console.log(arr.reduceCustom(reduceTest, 10));
console.log(arr.reduce(reduceTest, 10));

// map
const testMap = (num) => num * num;

Array.prototype.mapCustom = function(callbackFn) {
    let changedArray = [];
    for (let i = 0; i <= this.length-1; i++) {
        if (this[i] === undefined) {
            changedArray.push(this[i]);
            delete changedArray[i];
        } else {
            changedArray.push(callbackFn(this[i]));
        }
    }
    return changedArray
}

console.log(arr.map(testMap));
console.log(arr.mapCustom(testMap));


    // 2. ----------------------------------------------

for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}
// Цикл первым выполняется то setTimeout помещаются в очередь макрозадач
// var i относится к глобальной области видимости (функциональной нет) 
// и цикл отработав 3 шага i++ вернет 3
  
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}
// Цикл вторым выполняется, то setTimeout помещаются в очередь макрозадач (после setTimeout-ов с var)
// let c {} остаются в блочной области видимости, поэтому вывод запомнится замыканием 
// и цикл отработав 3 шага i++ вернет 0, 1, 2

// Итог 3,3,3,0,1,2

    // 3. --------------------------

Promise.resolve(1)
    .then((val) => {
        console.log(val); // 1 - передается результат промиса
        return val + 1;
    })
    .then((val) => {
        console.log(val); // 2 - передается результат предыдущего then
    })
    .then((val) => {
        console.log(val); // undefined - передается результат предыдущего без return
        return Promise.resolve(3).then((val) => {
            console.log(val); // 3 - передается результат промиса
        });
    })
    .then((val) => {
        console.log(val); // undefined - передается результат предыдущего без return
        return Promise.reject(4);
    })
    .catch((val) => {
        console.log(val); // 4 - передается результат промиса reject
    })
    .finally((val) => {
        console.log(val); // undefined - в finally передается undefined и ничего не возвращается (эффект проваливания)
        return 10;
    })
    .then((val) => {
        console.log(val); // undefined - передается результат предыдущего без return
    });


    // 4. ----------------------------------------------

function F() {
  // функция, которая содержит 
  // специальное свойство [[Prototype]], которое указывает на Object
  // и свойство конструктор которое описывает объект со свойствами 
  // при создании, в данном случае пустой объект
}

const x = {}

F.prototype =  x; //что тут происходит? зачем?
// свойство [[Prototype]] меняется, это делается для изменения наследования

const aa = new F();

console.log(aa.__proto__ === x) 
// aa.__proto__ cсылка на объект в [[Prototype]], что как раз и указывает на x = {}


    // 5. ----------------------------------------------------

const user = {
    name: 'Bob',
    funcFunc() {
        console.log(this)
        return function() {
            console.log(this);
        }   
    },
    funcArrow() {
        console.log(this)
        return () => {
            console.log(this);
        }
    },
    arrowFunc: () => {
        console.log(this)
        return function() {
            console.log(this);
        }
    },
    arrowArrow: () => {
        console.log(this)
        return () => {
            console.log(this);
        }
    },
}

user.funcFunc()(); // user/window
// вызов через точку не сработает во второй вызове, поэтому ссылка на window
user.funcArrow()(); // user/user
// стрелочная функция запомнила this в момент создания и равна user
user.arrowFunc()(); // window/window
// стрелочная функция запомнила this в момент создания и равна window
// возвращаемая функция берет тот же внешний контекст
user.arrowArrow()(); // window/window
// стрелочная функция запомнила this в момент создания и равна window
// возвращаемая стрелочная функция берет тот же контекст

    // 6. ----------------------------------------------------

var a = 1;
var b = 2;

(function() {
    console.log(this)
    var b = 3;
    a += b;
})();

console.log(a);  // 4 
// так как внутри функциональной области видимости не нашли a, 
// то идем в глобальную область видимости и присваиваем новое значение а
// функция лог срабатывает в глобальной области видимости
console.log(b);  // 2
// функция лог срабатывает в глобальной области видимости
// переменные b разные для глобальной и функциональной области видимости

