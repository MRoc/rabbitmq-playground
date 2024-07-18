# RabbitMQ Tutorial 5: Topics

This example shows how a receiver can listen to only topics and subtopics. This is done by using `*` (can substitute for exactly one word) and `#` (can substitute for zero or more words) in the routing key. The routing key must it must be a list of words, delimited by `.`:

https://www.rabbitmq.com/tutorials/tutorial-five-javascript

```bash
npm install amqplib
```

```
docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --name rabbitmq-container rabbitmq:3
npm run receive kernel.info
npm run receive kernel.*
npm run emit kernel.info
npm run emit kernel.error
```