/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

type Args = string | number

function memoize<TArgs extends Args[], TResult>
  ( fn: (...args: TArgs) => TResult ): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>()

  return ( ...args ) => {
    const key = JSON.stringify(args)
    const cached = cache.get(key)

    if (cached !== undefined) {
      return cached
    }

    const result = fn( ...args )
    cache.set( key, result )

    return result
  }
}

const slowAdd = (a: number, b: number): number => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
memoAdd(1, 2); // возвращает 3
memoAdd(1, 2); // из кэша, возвращает 3