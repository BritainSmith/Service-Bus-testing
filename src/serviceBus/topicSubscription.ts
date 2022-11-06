
import {
    ServiceBusClient,
    ServiceBusAdministrationClient,
    ServiceBusMessage
} from "@azure/service-bus";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string";
const topicName = "TopicSubscription" + new Date().getTime();

// Default rule name
const DEFAULT_RULE_NAME = "$Default";

//Messages to send

const firstSetOfMessages: ServiceBusMessage[] = [
    { subject: "Red", body: "test-red1" },
    { subject: "Red", body: "test-red2", correlationId: "notimportant" },
    { subject: "Red", body: "test-red3", correlationId: "important" },
    { subject: "Blue", body: "test-blue1" },
    { subject: "Blue", body: "test-blue2", correlationId: "notimportant" },
    { subject: "Blue", body: "test-blue3", correlationId: "important" },
    { subject: "Green", body: "test-green1" },
    { subject: "Green", body: "test-green2", correlationId: "notimportant" },
    { subject: "Green", body: "test-green3", correlationId: "important" },
  ];


  // Subscription names for topics
  const NoFilterSubscriptionName = "NoFilterSubscription";
  const SqlFilterOnlySubscriptionName = "RedSqlFilterSubscription";
  const SqlFilterWithActionSubscriptionName = "BlueSqlFilterWithActionSubscription";
  const CorrelationFilterSubscriptionName = "ImportantCorrelationFilterSubscription";

//   export async function main() {
//       const sb
//   }