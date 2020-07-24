# EnotIo

```js
const Enot = require('enot.io')

// OR

const { Enot } = require('enot.io')
```

## Constructor
Инициализация новой инстанции
```js
    new Enot([options])
```

Пример
```js
   const payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
   })
```

| Параметр | Тип | Описание |
|----------|--------|-------------------|
| options  | string | [Опции](#options) |

## Options
### Общие опции

| Опция | Тип | Описание | По умолчанию |
|----------|--------|-----------------------------------|--------------|
| secretWord | string | secretWord | null |
| apiKey | string | API KEY | null |
| email | string | EMAIL | null |
