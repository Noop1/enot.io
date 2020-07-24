# createPaymentLink

```js
var { Enot } = require('enot.io')
var payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
})
```

Создаем ссылку на оплату
```js
await payment.api.createPaymentLink({
     merchant: 5195,
     amount: 10,
     currency: 'RUB',
     pay_id: 10863017,
     params: { field1: 1, field2: 2 }
 }) // => Promise<object>
```
Параметры
| Параметр | Тип | Описание |
|-----------|-------|------------------|
| merchant | number | Id проекта |
| amount | number | Сумма оплаты |
| desc | string | Описания платежа |
| currency | string | Валюта |
| pay_id | number | Id платежа |
| params | object | Параметры |

Возвращает следующие свойства
| Параметр | Тип | Описание |
|----------|--------|------------------|
| url | string | Ссылка на оплату |
| ping | string | скорость создание ссылки |
