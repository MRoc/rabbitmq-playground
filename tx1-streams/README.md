# RabbitMQ Try-out: Streams

This example tries the replay functionality of RabbitMQ and its streams.

https://www.rabbitmq.com/tutorials/tutorial-one-javascript-stream

```bash
npm install
docker run --name rabbitmq -p 5552:5552 -p 15672:15672 -p 5672:5672 -e RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS='-rabbitmq_stream advertised_host localhost' rabbitmq:3.13
docker exec rabbitmq rabbitmq-plugins enable rabbitmq_stream rabbitmq_stream_management 
npm run receive
npm run send
npm run send
npm run send
```