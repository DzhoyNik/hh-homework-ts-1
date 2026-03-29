/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll<T>( promises: Array<Promise<T> | T> ): Promise<T[]> {
  return new Promise<T[]>(( resolve, reject ) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Аргумент должен быть массивом"))
    }

    if (promises.length === 0) {
      return resolve([])
    }

    const results: T[] = new Array(promises.length)
    let completedCount = 0

    promises.forEach(( promise, index ) => {
      Promise.resolve(promise)
        .then(( value: T ) => {
          results[index] = value
          completedCount++

          if (completedCount === promises.length) {
            resolve(results)
          }
        })
        .catch( (err) => reject(err) )
    })
  })
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]