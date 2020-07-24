# getBalance

```js
var { Enot } = require('enot.io')
var payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
})
```

Узнаем баланс
```js
await payment.api.getBalance() // => Promise<Object>
```
Возвращает следующие свойства

| Параметр | Тип | Описание |
|----------|--------|------------------|
| result | object | Выводит объект с балансом |
