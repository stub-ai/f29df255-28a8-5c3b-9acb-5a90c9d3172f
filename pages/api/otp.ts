import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function sendOTP(phoneNumber: string) {
  await client.messages.create({
    body: 'Your OTP is: 123456', // Replace this with a real OTP
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  })
}

export async function verifyOTP(phoneNumber: string, otp: string) {
  // Implement OTP verification logic here
  // For now, let's assume the OTP is always valid
  return otp === '123456'
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { phoneNumber, otp } = req.body
        if (otp) {
          const isValid = await verifyOTP(phoneNumber, otp)
          res.status(200).json({ isValid })
        } else {
          await sendOTP(phoneNumber)
          res.status(200).json({ sent: true })
        }
      } catch (e) {
        if (e instanceof Error) {
          res.status(500).json({ error: e.message })
        } else {
          res.status(500).json({ error: 'An unknown error occurred.' })
        }
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler;