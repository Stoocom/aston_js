// 6) Решить: 

console.log( "B" + "a" + (1 - "hello")); //  BaNAN - нельзя вычесть строку
console.log((true && 3) + "d"); // 3d
console.log(Boolean(true && 3) + "d"); // trued
console.log(NaN + 1) // NaN
// Если где-то в математическом выражении есть NaN, 
// то оно распространяется на весь результат (есть только одно исключение: NaN ** 0 равно 1).
console.log(NaN + 'o') // NaNо
console.log(undefined + 1) // NaN
console.log(undefined - 1) // NaN
console.log(null + 1) // 1
console.log(null / 5) // 0
console.log(5 / undefined) // NaN
console.log(-5 / +null) // -Infinity
console.log(null == 0) // false*
console.log(null == "") // false*
console.log(null > 0) // false*
console.log(null >= 0) // true*
console.log('foo' + + 'bar') // fooNaN
console.log('11' + '1' - 1) // 110
console.log(typeof Object) // function
console.log(typeof Math) // object
console.log(new String('foo')=='foo') // true
console.log(new String('foo')==='foo') // false


// *
console.log( null > 0 );  // (1) false
console.log( null == 0 ); // (2) false
console.log( null >= 0 ); // (3) true
// С точки зрения математики это странно. Результат последнего сравнения говорит о том, 
// что «null больше или равно нулю», тогда результат одного из сравнений выше должен быть true, но они оба ложны.
// Причина в том, что нестрогое равенство и сравнения > < >= <= работают по-разному. 
// Сравнения преобразуют null в число, рассматривая его как 0. Поэтому выражение (3) null >= 0 истинно, а null > 0 ложно.
// С другой стороны, для нестрогого равенства == значений undefined и null действует особое правило: 
// эти значения ни к чему не приводятся, они равны друг другу и не равны ничему другому. Поэтому (2) null == 0 ложно.