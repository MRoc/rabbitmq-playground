import amqp from "amqplib";

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const q = await channel.assertQueue("", {
    exclusive: true,
  });

  // Client needs to remember correlationId to check if it made the call or not.
  var correlationId = generateUuid();
  var num = parseInt(args[0]);

  console.log(" [x] Requesting fib(%d)", num);

  channel.consume(
    q.queue,
    function (msg) {
      if (msg.properties.correlationId == correlationId) {
        console.log(" [.] Got %s", msg.content.toString());
        setTimeout(function () {
          connection.close();
          process.exit(0);
        }, 500);
      }
    },
    {
      noAck: true,
    }
  );

  channel.sendToQueue("rpc_queue", Buffer.from(num.toString()), {
    correlationId: correlationId,
    replyTo: q.queue,
  });
} catch (error) {
  console.error(error);
}

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
