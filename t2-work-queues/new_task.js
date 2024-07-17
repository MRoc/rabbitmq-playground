import amqp from "amqplib";

var queue = "task_queue";
var msg = process.argv.slice(2).join(' ') || "Hello World!";

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  channel.assertQueue(queue, {
    durable: true,
  });

  channel.sendToQueue(queue, Buffer.from(msg), {
    persistent: true
  });
  console.log(" [x] Sent %s", msg);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
} catch (error) {
  console.log(error);
}
