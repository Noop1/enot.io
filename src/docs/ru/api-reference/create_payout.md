# createPayout

```js
var { Enot } = require('enot.io')
var payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
})
```

Создание выплаты
```js
await payment.api.createPayout({ ... }) // => Promise<Object>
```
| Параметр | Тип | Описание |
|----------|--------|------------------|
| service | String | Платежная система |
| amount | Number | Сумма выплаты в рублях |
| wallet | String | Кошелек/Номер карты получателя |

Платёжные системы:
- `qw` — Qiwi Wallet;
- `ym` — Яндекс.Деньги;
- `wm`— Webmoney (WMZ);
- `mb` — Мобильный платеж;
- `cd` — Visa/Mastercard/Мир

Возвращает следующие свойства

| Параметр | Тип | Описание |
|----------|--------|------------------|
| result | object | Возращает объект с выполненным запросом |