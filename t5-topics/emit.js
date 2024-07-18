import amqp from "amqplib";

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var exchange = 'topic_logs';
  var args = process.argv.slice(2);
  var msg = args.slice(1).join(' ') || 'Hello World!';
  var key = (args.length > 0) ? args[0] : 'info';

  channel.assertExchange(exchange, 'topic', {
    durable: false
  });

  channel.publish(exchange, key, Buffer.from(msg));
  console.log(` [x] Sent ${key}: '${msg}'`);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
} catch (error) {
  console.log(error);
}
