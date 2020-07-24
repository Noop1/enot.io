# getPayoutInfo

```js
var { Enot } = require('enot.io')
var payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
})
```

Узнаем информацию о выплате.
```js
await payment.api.getPayoutInfo(withId); // => Promise<Object>
```
| Параметр | Тип | Описание |
|----------|--------|------------------|
| withId | Number | Id выплаты |

Возвращает следующие свойства

| Параметр | Тип | Описание |
|----------|--------|------------------|
| result | object | Выводит объект с комиссиями |