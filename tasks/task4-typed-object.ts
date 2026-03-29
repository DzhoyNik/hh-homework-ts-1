/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

type SchemaValue = "string" | "number" | "boolean"
type Schema = Record<string, SchemaValue>

type TypeFromSchemaValue<T extends SchemaValue> = 
  T extends "string" ? string :
  T extends "number" ? number :
  T extends "boolean" ? boolean :
  never

type ObjectFromSchema<TShema extends Schema> = {
  [key in keyof TShema]: TypeFromSchemaValue<TShema[key]>
}

function typedObject<TSchema extends Schema>( schema: TSchema ): ObjectFromSchema<TSchema> {
  const target = {} as ObjectFromSchema<TSchema>

  return new Proxy(target, {
    set( obj, prop: string, value ) {
      if (!(prop in schema)) {
        throw new Error(`Свойство "${String(prop)}" не описано в схеме`)
      }

      const expectedType = schema[prop as keyof TSchema]
      const actualType = typeof value

      if (expectedType !== actualType) {
        throw new Error(`Неверный тип для свойста "${String(prop)}". Ожидался - ${expectedType}, пришел - ${actualType}`)
      }

      obj[prop as keyof TSchema] = value as ObjectFromSchema<TSchema>[keyof TSchema]
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