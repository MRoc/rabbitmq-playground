import rabbit from "rabbitmq-stream-js-client";

try {
  console.log("Receiver starting...");

  console.log("Connecting...");
  const client = await rabbit.connect({
    hostname: "localhost",
    port: 5552,
    username: "guest",
    password: "guest",
    vhost: "/",
  });

  const streamName = "test-stream";

  console.log("Creating stream...");
  const streamSizeRetention = 5 * 1e9;
  await client.createStream({
    stream: streamName,
    arguments: { "max-length-bytes": streamSizeRetention },
  });

  console.log("Declaring consumer...");
  await client.declareConsumer(
    { stream: streamName, offset: rabbit.Offset.first() },
    (message) => {
      console.log(`Received message ${message.content.toString()}`);
    }
  );
} catch (error) {
  console.log(error);
}
