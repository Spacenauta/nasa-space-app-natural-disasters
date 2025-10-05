/** biome-ignore-all lint/suspicious/useAwait: <explanation> */
/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
export type NotificationServices = {
  sendNotification(
    recipient: string,
    subject: string,
    body: string
  ): Promise<void>
}
