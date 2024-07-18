# RabbitMQ Tutorial 3: Publish Subscribe

This tutorial has two receivers and one emitter.

https://www.rabbitmq.com/tutorials/tutorial-three-javascript

```bash
npm install amqplib
```

```
docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --name rabbitmq-container rabbitmq:3
npm run receive
npm run receive
npm run emit
```