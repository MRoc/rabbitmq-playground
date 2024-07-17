import amqp from "amqplib";

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var queue = "hello";
  var msg = "Hello world";

  channel.assertQueue(queue, {
    durable: false,
  });

  channel.sendToQueue(queue, Buffer.from(msg));
  console.log(" [x] Sent %s", msg);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
} catch (error) {
  console.log(error);
}
