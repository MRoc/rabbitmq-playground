import amqp from "amqplib";

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive.js [info] [warning] [error]");
  process.exit(1);
}

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var exchange = "topic_logs";

  channel.assertExchange(exchange, "topic", {
    durable: false,
  });

  // Passing a queue name and exclusive=false will make it round-robin between consumers.
  const q = await channel.assertQueue("", {
    exclusive: true,
  });

  // Bind the queue to all routing keys (or message types) you want to receive
  args.forEach(async function (key) {
    console.log(`  [*] Binding queue '${q.queue}' to exchange '${exchange}' with key '${key}'`);
    await channel.bindQueue(q.queue, exchange, key);
  });

  channel.consume(
    q.queue,
    function (msg) {
      console.log(` [x] '${msg.fields.routingKey}': '${msg.content.toString()}'`);
    },
    {
      noAck: true,
    }
  );
} catch (error) {
  console.log(error);
}
