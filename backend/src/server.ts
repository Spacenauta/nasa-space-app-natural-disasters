import { app } from "@/app"
import { env } from "@/env"
import { startScheduler } from "@/scheduler"

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    // biome-ignore lint/suspicious/noConsole: show server
    console.log("🚀 HTTP Server Running!")

    startScheduler()
  })
