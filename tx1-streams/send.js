import rabbit from "rabbitmq-stream-js-client";

try {
  console.log("Sender starting...");

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

  console.log("Declaring publisher...");
  const publisher = await client.declarePublisher({ stream: streamName });

  console.log("Sending a message...");
  await publisher.send(Buffer.from("Test message"));
  console.log("Sent!");

  setTimeout(function () {
    client.close();
    process.exit(0);
  }, 500);
} catch (error) {
  console.log(error);
}
