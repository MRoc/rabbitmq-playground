# RabbitMQ Tutorial 4: Routing

This example shows how a receiver can listen to only certain type of messages by binding the queue to a receiver key.

https://www.rabbitmq.com/tutorials/tutorial-four-javascript

```bash
npm install amqplib
```

```
docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --name rabbitmq-container rabbitmq:3
npm run receive warning
npm run receive info warning
npm run emit info
npm run emit warning
```