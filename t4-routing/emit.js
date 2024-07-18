import amqp from "amqplib";

try {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  var exchange = 'direct_logs';
  var args = process.argv.slice(2);
  var msg = args.slice(1).join(' ') || 'Hello World!';
  var msg_type = (args.length > 0) ? args[0] : 'info';

  channel.assertExchange(exchange, 'direct', {
    durable: false
  });

  channel.publish(exchange, msg_type, Buffer.from(msg));
  console.log(` [x] Sent ${msg_type}: '${msg}'`);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
} catch (error) {
  console.log(error);
}
