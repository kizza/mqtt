import mqtt, { IClientOptions } from "mqtt";
import { env } from "./env";

const { keys } = Object;

const options: IClientOptions = {
  host: env("MQTT_HOST"),
  port: env<number>("MQTT_PORT"),
  username: env("MQTT_USERNAME"),
  password: env("MQTT_PASSWORD"),
  clientId: "kizza-klient",
  keepalive: 60 * 10,
  reconnectPeriod: 1000,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: false
};

export type Client = {
  disconnect: () => void;
};

export const createClient = (
  subscriptions: Record<string, (message: string) => void>
) => {
  const client = mqtt.connect(env("MQTT_HOST"), options);

  client.on("connect", () => {
    console.log("✓ Connected to mqtt");

    keys(subscriptions).forEach((topic: string) =>
      client.subscribe(topic, (_err: Error) =>
        console.log(`✓ Subscribed to '${topic}' topic`)
      )
    );
  });

  client.on("error", (e: any) => {
    console.log("Mqtt client error", e);
  });

  client.on("message", (topic: string, buffer: Buffer) => {
    const message = buffer.toString();

    console.log(`Received ${message}`);

    const fallback = () =>
      console.log(
        `No callback found for topic ${topic} with message ${message}`
      );

    const callback = subscriptions[topic] || fallback;

    callback(message);
  });

  return { disconnect: () => client.end };
};

