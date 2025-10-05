import nodemailer from "nodemailer"
import { env } from "@/env"

import type { NotificationServices } from "@/utils/notification"

export class SmtpNotificationService implements NotificationServices {
  protected transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  })

  async sendNotification(
    recipient: string,
    subject: string,
    body: string
  ): Promise<void> {
    const htmlBody = `
      <html>
        <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <div style="background-color: #ffcccc; padding: 15px; border-radius: 8px; border: 1px solid #cc0000;">
            <h2 style="color: #cc0000;">${subject}</h2>
          </div>
          <p>${body.replace(/\n/g, "<br>")}</p>
          <p style="font-size: 0.8em; color: #666;">Este é um alerta automático do Sistema de Previsão de Desastres Naturais.</p>
        </body>
      </html>
    `

    try {
      await this.transporter.sendMail({
        from: `"Agente NASA Alerta" <${env.SMTP_USER}>`,
        to: recipient,
        subject,
        text: body,
        html: htmlBody,
      })

      console.log(`[SMTP SUCESSO] Alerta enviado para: ${recipient}`)
    } catch (error) {
      console.error(
        `[SMTP ERRO] Falha ao enviar e-mail para ${recipient}. Verifique credenciais e firewall.`,
        error
      )
      throw new Error("Falha no serviço de notificação SMTP.")
    }
  }
}
