import { ServiceBusClient } from '@azure/service-bus';

import * as dotenv from 'dotenv';
dotenv.config();

//Define connection
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || '<connection string>';
const queueName = process.env.QUEUE_NAME || '<queue name>';

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // If recieving from a sub you can use the createReciever(topicName, subscriptionName) overload instead.
  const queueReciever = sbClient.createReceiver(queueName);

  // To receive messages from sessions, use getSessionReciever instead of getReceiver.

  try {
    const allMessages = [];

    console.log(`Recieving 10 messages...`);

    while (allMessages.length < 10) {
      // asking for 10 messages does not guarantee that we will return all 10 at once.
      // Must loop until we get all messages we expeected.
      const messages = await queueReciever.receiveMessages(10, {
        maxWaitTimeInMs: 60 * 1000,
      });

      if (!messages.length) {
        console.log('No more messages to receive');
        break;
      }

      console.log(`Received ${messages.length} messages`);
      allMessages.push(...messages);

      for (const message of messages) {
        console.log(` Message: '${message.body}'`);

        // completing the message will remove it from the remote queue or sub.
        await queueReciever.completeMessage(message);
      }
    }

    await queueReciever.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log('ReceiveMessageLoop - Error Occured: ', err);
  process.exit(1);
});
