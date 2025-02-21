    // 1. ------------------------------------------------------

Promise.reject("a")
    .catch(p => p + "b") // 1. return "ab"
    .catch(p => p + "c") // пропуск
    .then(p => p + "d") // 2. return "abd"
    .then(p => p + "f") // 3. return "abdf"
    .catch(p => p + "h") // пропуск
    .finally(p => p + "e") // пропуск аргумент = undefined, пропуск
    .then(p => console.log(p)) // 4. return undefined (console.log - функция без возврата), но сначала лог "abdf" из 3  
  
    // 2. ------------------------------------------------------

console.log("1"); // Текущая микрозадача выполняется в первой очереди

setTimeout(() => console.log("2"), 1); // Макрозадача переносится в очередь Макрозадач, не выполняется

new Promise((resolve, reject) => {
    console.log("7");
    resolve();
});  // Promise относится к микрозадачам, выполняется сразу
let promise = new Promise((resolve, reject) => {
    console.log("3");
    resolve();
});

promise.then(() => console.log("4")); // Promise резолвится сразу же, относится к микрозадаче, выполнение сразу

setTimeout(() => console.log("5"), 0); // Макрозадача переносится в очередь Макрозадач, не выполняется

console.log("6"); // Текущая микрозадача выполняется в первой очереди

// После выполнение последней микрозадачи, Event Loop смотрит в очередь Макрозадач 
// и забирает для выполнение макрозадачу первую (console.log("2"))
// далее смотрит снова в список задач микротаск и запускает выполнение второй макрозадачи,
// как только проходит нужное время, задачи попадают в список микрозадач и выполняются в синхронном коде

    // 3. ------------------------------------------------------

setTimeout(() => console.log("a")); // Макрозадача переносится в очередь Макрозадач, не выполняется

Promise.resolve()
    .then((first) => {
        console.log("first: ", first);
        return "b";
    })
    .then(
        Promise.resolve()
        .then((second) => {
            console.log("second: ", second);
            return "c";
        }) // очередь микротаски выполнение в второй очереди после синхронных операций
        // с никуда не переносится далее по then, потому что никуда не передаем
    )
    .then((third) => console.log("third: ", third));
    // очередь микротаски выполнение в второй очереди после синхронных операций

console.log("d"); // Текущая микрозадача выполняется в первой очереди

    // 4. ------------------------------------------------------

let a = 5;
console.log(a); // 5 очередь микротаск шаг 1 

setTimeout(() => {
    console.log(a); // 15 очередь макротаск шаг 4
    a = 10;
}, 0); 

Promise.resolve()
    .then(() => {
        console.log(a); // 5 вторая очередь микротаск шаг 3
        a = 15;
    })

console.log(a); // 5 очередь микротаск шаг 2

    // 5. ------------------------------------------------------

function getData(url, attempts, maxRequests, resolve, reject) {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            resolve(data);
        }).catch((e) => {
            attempts++;
            if (attempts >= maxRequests) {
                reject(`Ошибка получения данных после ${attempts} запросов`)
            } else {
                getData(url, attempts, maxRequests, resolve, reject);
            }
        });
};

function fetchUrl(url, maxRequests) {
    let attempts = 0;
    return new Promise((resolve, reject) => {
        getData(url, attempts, maxRequests, resolve, reject);
    });
}

let url = 'https://google/com&#39';

fetchUrl(url, 5)
    .then((res) => {
        console.log(res);  
    })
    .catch((e) => {
        console.log(e);
    })
