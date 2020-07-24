# getPaymentMethods

```js
var { Enot } = require('anypay.io')
var payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
})
```

Получение включенных методов оплат в магазине.
```js
await payment.api.getPaymentMethods() // => Promise<Object>
```
Возвращает следующие свойства

| Параметр | Тип | Описание |
|----------|--------|------------------|
| result | object | возращает объект с включенными методами |