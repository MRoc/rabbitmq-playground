import amqp from "amqplib";

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive.js [info] [warning] [error]");
  process.exit(1);
}

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var exchange = "direct_logs";

  channel.assertExchange(exchange, "direct", {
    durable: false,
  });

  // Passing a queue name and exclusive=false will make it round-robin between consumers.
  const q = await channel.assertQueue("", {
    exclusive: true,
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

  // Bind the queue to all routing keys (or message types) you want to receive
  args.forEach(async function (severity) {
    await channel.bindQueue(q.queue, exchange, severity);
  });

  channel.consume(
    q.queue,
    function (msg) {
      console.log(` [x] ${msg.fields.routingKey}: '${msg.content.toString()}'`);
    },
    {
      noAck: true,
    }
  );
} catch (error) {
  console.log(error);
}
