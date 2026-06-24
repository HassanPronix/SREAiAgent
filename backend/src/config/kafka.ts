import { Kafka } from "kafkajs";
import { env } from "./env.js";

export const kafka = new Kafka({
  clientId: env.serviceName,
  brokers: env.kafkaBrokers,
});