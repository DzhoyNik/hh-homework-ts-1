/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  const targer = {}

  return new Proxy(targer, {
    set( obj, prop, value ) {
      if (!(prop in schema)) {
        throw new Error(`Свойство "${String(prop)}" не описано в схеме`)
      }

      const expectedType = schema[prop]
      const actualType = typeof value

      if (expectedType !== actualType) {
        throw new Error(`Неверный тип для свойста "${String(prop)}". Ожидался - ${expectedType}, пришел - ${actualType}`)
      }

      obj[prop] = value
      return true
    }
  })
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится
user.age = "20";    // должно выбросить ошибку