# Enot.io

## Description
> Модуль для использования платежной системы API Enot.io.

## Installation
```bash
npm i enot.io
```

## Example
```js
const { Enot } = require('enot.io')
const payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
})

async function run() {
    let balance = await payment.api.getBalance()

	console.log(balance);
}

run().catch(console.log);
```

## README
   * [RU](src/docs/ru)

> Сделано на основе модуля для anypay.io   


