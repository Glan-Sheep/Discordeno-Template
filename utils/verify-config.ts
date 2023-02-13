import log from "utils/logger.ts";

export default function run() : boolean{
  if (+(Deno.version.deno.slice(1).split(".")[0]) >= 1) {
    log.error("Deno 1 or higher is requred");
    return false;
  }

  if (!Deno.env.get("TOKEN")) {
    log.info("Checking token");
  } else {
    log.error("TOKEN ERROR");
    return false;
  }
  return true;
}