import { MoistureLevel } from "./models";
import { persist } from "./persist";
import { createClient } from "./read";

console.log("Starting mqtt client...");

createClient({
  presence: message => {
    const segments = message.split("|");

    const [sensor, value] =
      segments.length == 2 ? segments : ["Unknown", message[0]];

    persist<MoistureLevel>("MoistureLevel", {
      Sensor: sensor,
      Value: parseInt(value) || -1
    });
  }
});
