    // ---------------------------------------------------------------------------------------------------------------------
    // 1) Написать ответ - почему массивы в JS являются "неправильными" и совмещают в себе несколько структур данных? Какие?
    
// Ответ: массивы совмещают следующие структуры данных: 
// стек (коллекция данных),
// связный список (так как можно добавлять данные с начала и с конца массива и удалять данные),
// хэш-таблица (упорядоченный перечень данных)

    // ------------------------------------------------------------------------------------------------
    // 2) Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value 
    // (Привязать через bind, call, apply)


const logger = () => {
    console.log(`I output only external context: ${this.item}`);
}
    
const obj = { item: "some value" };

// apply/call
// logger.apply(obj);
// logger.call(obj);

// bind

const bindLogger = logger.bind(obj);
// console.log(bindLogger());

    // ------------
    // 3.1-3.3 this:
// window.a = 200;

const obj2 = {
    a: 1,
    e: (function fn() {
        return () => {
            console.log(this.a);
        };
    })()
};
    
    
// obj2.e(); // undefined
// obj2.e.call({ a: 2 }); // undefined

// На этапе создания объекта в ключе е сразу вызывается самовызывающаяся функция с констекстом глобальным 
// и ключу е присвается функция стрелочная с контекстом таким же глобальным, 
// стрелочная функция сохраняет свой контекст при объевлении объекта и больше не меняет контекст
// Даже если мы передаем контекст методом  сall, то стрелочная функция все равно будет ссылаться на глобальный контекст

const obj3 = {
    child: {
        i: 10,
        b: () => { 
            console.log(this.i, this);
        },
        c() {
            console.log(this.i, this);
        },
    }
};

// obj3.child.b(); // undefined, глобальный обьект window
// obj3.child.c(); // 10, объект child

// Cтрелочная функция сохраняет свой контекст при объявлении объекта и больше не меняет контекст,
// в данном примере функция будет иметь глобальный контекст
// обычная функция с() формирует лексическое значение из объекта, откуда была вызвана


function foo() {
    const x = 10;
    // console.log('this foo', this);
    return {
        x: 20,
        bar: () => {
            // console.log('bar', this);
            console.log(this.x);
        },
        baz: function () {
            // console.log('baz', this);
            console.log(this.x);
        }
    };
}

const obj4 = foo();
obj4.bar(); // undefined
// стрелочная функция сохраняет свой контекст при объявлении объекта и больше не меняет контекст,
// в момент инициализации контекст равен Window
obj4.baz(); // 20
// обычная функция baz() формирует лексическое значение из объекта, откуда была вызвана

const obj5 = foo.call({ x: 30 });
// console.log('obj5', obj5);
// переопределение контекста не влияет на стрелочную функцию

let y = obj5.bar;
// в момент инициализации изменился контекст = { x: 30 }, далее не меняется
let z = obj5.baz;

y();   // 30
// вызов стрелочной функции с предпределенным контекстом obj5 = { x: 30 } 
// в момент инициализации изменился контекст, далее не меняется
z();   // undefined
// вызов без точки, поэтому контекст window


obj5.bar();    // 30
// вызов стрелочной функции с предпределенным контекстом obj5 = { x: 30 } 
// в момент инициализации изменился контекст, далее не меняется
obj5.baz();    // 20
// обьект obj5 = {x: 20, bar: ƒ, baz: ƒ}, вызов через точку вернет 20 из лексического окружения объекта

    // ------------
    // 4.1 Массивы:

// - Создайте массив чисел и найдите его сумму разными способами.

let arrayNum = [1,25,4, 10, 20];

// цикл
let sum = 0;
for (let i = 0; i < arrayNum.length; i++) {
    sum += arrayNum[i];
}
// console.log(sum);


// reduce
const sum2 = arrayNum.reduceRight((a, b) => a + b, 0);
// console.log(sum2);

// forEach
let sum3 = 0;
arrayNum.forEach(function(num) {
    sum3 += num;
});
// console.log(sum3);


// - Создайте массив строк и объедините их в одну строку разными способами.
let arrayString = ['Надо ', 'бы ', 'поесть ', 'что-то.'];

// join
let str1 = arrayString.join('');
// console.log(str1);

// toString() & regExp
const regExp = /\,/g;
let str2 = arrayString.toString().replace(regExp, '');
// console.log(str2);

// forEach 
let str3 = '';
arrayString.forEach((str) => {
    str3 += str;
});
// console.log(str3);

// - Найдите максимальный и минимальный элементы в массиве чисел разными способами.

// Apply
const findMaxInArray1 = (numArray) => {
    return Math.max.apply(null, numArray);
}
const findMinInArray1 = (numArray) => {
    return Math.min.apply(null, numArray);
}

// console.log(findMaxInArray1(arrayNum));
// console.log(findMinInArray1(arrayNum));

// ForEach
const findMaxInArray2 = (numArray) => {
    return numArray.reduce(
        (acc, number) => (number > acc ? number : acc),
        // Сначала принимаем за максимальное первый элемент массива 
        numArray[0]
    );
}
const findMinInArray2 = (numArray) => {
    return numArray.reduce(
        (acc, number) => (number < acc ? number : acc),
        numArray[0]
    );
}

// console.log(findMaxInArray2(arrayNum));
// console.log(findMinInArray2(arrayNum));

// sort
const findMaxInArray3 = (numArray) => numArray.sort((a, b) => b - a)[0];
const findMinInArray3 = (numArray) => numArray.sort((a, b) => a - b)[0];

// console.log(findMaxInArray3(arrayNum));
// console.log(findMinInArray3(arrayNum));

// forEach
function findMaxInArray4(list) {
    let max = list[0];
    list.forEach((e) => {
      if (e > max) max = e;
    });
    return max;
}
function findMinInArray4(list) {
    let min = list[0];
    list.forEach((e) => {
      if (e < min) min = e;
    });
    return min;
}

console.log(findMaxInArray4(arrayNum));
console.log(findMinInArray4(arrayNum));


    // ------------
    // 4.2 Stack (стек):


// - Реализуйте стек с использованием массива.
class Stack {
    items = [];
  
    push(value) {
      this.items.push(value);
    }
  
    pop() {
      return this.items.pop();
    }
  
    isEmpty() {
      return this.items.length == 0;
    }

    getFirstItem() {
        return items[0];
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.pop();
// console.log('stack', stack);

// Обход дерева с помощью стека

let tree = {
    data: 1,
    refs: [{
        data: 5,
        refs: [{ data: 10 }, {
            data: 7,
            refs: [{ data: 9 }, { data: 8 }]
        }, { data: 6 }]
    }, {
        data: 2,
        refs: [{ data: 4 }, { data: 3 }]
    }]
};

function watchTree(tree) {
    let stack = new Stack();
    stack.push(tree);
    // console.log(stack.items[0]);
    let currentLink;

    while ( currentLink = stack.pop() ) {
        // console.log('start');
        while (true) {
            console.log(currentLink.data);
            if ( !currentLink.refs ) {
                // console.log('break');
                break;
            }
            for (let i = 0; i < currentLink.refs.length - 1; i++) {
                stack.push( currentLink.refs[i] );
            }
            currentLink = currentLink.refs[currentLink.refs.length - 1];
        }
    }
}

watchTree(tree);


    // ------------
    // 4.3 Queue (очередь):

// - Реализуйте очередь с использованием массива.

class Queue {
    items = [];
    
    addToStartPosition(value) {
        this.items.push(value);
    }
      
    deleteFirstPosition() {
        this.items.shift();
    }
      
    isEmpty() {
        return this.items.length == 0;
    }
}

// - Имитируйте работу очереди на примере ожидания на кассе.
const queue = new Queue();
queue.addToStartPosition(1);
queue.deleteFirstPosition();
queue.addToStartPosition(2);
queue.addToStartPosition(3);
queue.deleteFirstPosition();
// console.log('queue', queue);
