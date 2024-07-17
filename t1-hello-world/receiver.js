import amqp from "amqplib";

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var queue = "hello";

  channel.assertQueue(queue, {
    durable: false,
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(
    queue,
    function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
    },
    {
      noAck: true,
    }
  );
} catch (error) {
  console.log(error);
}
