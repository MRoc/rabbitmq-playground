# RabbitMQ Tutorial 1: Hello World

https://www.rabbitmq.com/tutorials/tutorial-one-javascript

```bash
npm install amqplib
```

```
docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --name rabbitmq-container rabbitmq:3
npm run sender
npm run receiver
```