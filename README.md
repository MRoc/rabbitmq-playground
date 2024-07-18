# rabbitmq-tutorials

Learning RabbitMQ with NodeJS by following their tutorials at https://www.rabbitmq.com/tutorials.

```bash
npm init
npm install amqplib
```

 To quickly boot a RabbitMQ server, use the following command:

```bash
docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --name rabbitmq-container rabbitmq:3
```