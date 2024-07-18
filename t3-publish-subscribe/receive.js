import amqp from "amqplib";

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var exchange = "logs";

  channel.assertExchange(exchange, "fanout", {
    durable: false,
  });

  const q = await channel.assertQueue("", {
    exclusive: true,
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
  await channel.bindQueue(q.queue, exchange, "");

  channel.consume(
    q.queue,
    function (msg) {
      if (msg.content) {
        console.log(" [x] %s", msg.content.toString());
      }
    },
    {
      noAck: true,
    }
  );
} catch (error) {
  console.log(error);
}
