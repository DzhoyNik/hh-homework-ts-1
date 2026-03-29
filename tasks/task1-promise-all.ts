/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise(( resolve, reject ) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Аргумент должен быть массивом"))
      return
    }

    if (promises.length === 0) {
      reject([])
      return
    }

    const results = new Array(promises.length)
    let completedCount = 0

    promises.forEach(( promise, index ) => {
      Promise.resolve(promise)
        .then(( value ) => {
          results[index] = value
          completedCount++

          if (completedCount === promise.length) return resolve(results)
        })
        .catch(reject)
    })
  })
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]