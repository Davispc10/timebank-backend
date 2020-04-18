interface MailTo {
  name: string
  email: string
}

interface MailMessage {
  subject: string
  body?: string // ? opcional
}

// Data Transfer Object (DDD)
interface MessageDTO {
  to: MailTo
  message: MailMessage
}

interface EmailService {
  sendMail(request: MessageDTO): void
}

class EmailService implements EmailService {
  sendMail ({ to, message }: MessageDTO): void {
    console.log(`Email enviado para ${to.name}: ${message.subject}`)
  }
}

export default EmailService
