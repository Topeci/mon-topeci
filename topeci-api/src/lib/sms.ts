import { twilioClient } from '../config/twilio';

export const sendSMS = async (to: string, message: string) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: to, // doit être un numéro vérifié en mode trial
    });

    console.log("✅ SMS envoyé:", response.sid);
  } catch (err) {
    console.error("❌ Erreur lors de l'envoi du SMS:", err);
  }
};
