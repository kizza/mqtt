if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

type EnvironmentVariable =
  | "MQTT_HOST"
  | "MQTT_PORT"
  | "MQTT_USERNAME"
  | "MQTT_PASSWORD"
  | "PERSIST_BASE_URL"
  | "PERSIST_APP_ID"
  | "PERSIST_API_KEY"
  | "PERSIST_USERNAME"
  | "PERSIST_PASSWORD";

export const env = <T>(key: EnvironmentVariable) => {
  if (process.env[key]) {
    return (process.env[key] as unknown) as T;
  }

  throw Error(`No environment variable found for ${key}`);
};
