import axios from "axios";
import { env } from "./env";
import { Persistable } from "./models";

const client = axios.create({
  baseURL: env("PERSIST_BASE_URL"),
  auth: {
    username: env("PERSIST_USERNAME"),
    password: env("PERSIST_PASSWORD")
  },
  headers: {
    "content-type": "application/json",
    "X-Parse-Application-Id": env("PERSIST_APP_ID"),
    "X-Parse-REST-API-Key": env("PERSIST_API_KEY")
  }
});

export const persist = <T extends Persistable>(modelName: string, model: T) =>
  client
    .post(`/classes/${modelName}`, model)
    .then(() => {
      console.log(`Persisted ${modelName}`, model);
    })
    .catch(e => {
      console.log(`Error persisting ${modelName}`, model, e);
    });
