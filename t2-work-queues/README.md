# RabbitMQ Tutorial 2: Work Queues

This tutorial has two workers that consume messages round robin.

https://www.rabbitmq.com/tutorials/tutorial-two-javascript

```bash
npm install amqplib
```

```
docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --name rabbitmq-container rabbitmq:3
npm run worker
npm run worker
npm run new_task "Task 1"
npm run new_task "Task 2"
npm run new_task "Task 3"
npm run new_task "Task 4"
```