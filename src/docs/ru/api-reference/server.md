# createSession

```js
var { Enot } = require('enot.io')
var payment = new Enot({
    secretWord: process.env.SECRET_WORD,
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL
})
```

Разворачиваем сервер для принятия запросов с anypay.io
```js
payment.api.createSession(port, {
   url: 'payment',
   handler: (req, res) => {
      res.json(req.query)
      console.log(req.query)
   }
}) // => Promise<Object>
```
| Параметр | Тип | Описание | 
|------------------|-------|------------------|
| port | Number | Порт |
| url | string | Ссылка на которую будут приходить post запросы |
| handler | function | Обработчик |

Обратите внимание, что Enot.io не поддерживает отправку запросов об успешной оплате на порты ( прим 127.0.0.1:8080 ).

Для этого используйте просто домен или же IP сервера.
