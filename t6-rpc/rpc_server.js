import amqp from "amqplib";

function fibonacci(n) {
  if (n == 0 || n == 1) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var queue = "rpc_queue";

  channel.assertQueue(queue, {
    durable: false,
  });
  channel.prefetch(1);
  console.log(" [x] Awaiting RPC requests");
  channel.consume(queue, function reply(msg) {
    var n = parseInt(msg.content.toString());

    console.log(" [.] fib(%d)", n);

    var r = fibonacci(n);

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
      correlationId: msg.properties.correlationId,
    });

    channel.ack(msg);
  });
} catch (error) {
  console.error(error);
}
