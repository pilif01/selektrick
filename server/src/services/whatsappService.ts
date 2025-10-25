import dotenv from 'dotenv';

dotenv.config();

/**
 * WhatsApp Service for sending form submission notifications
 *
 * This service uses Twilio's WhatsApp API to send messages.
 *
 * Setup Instructions:
 * 1. Sign up for a Twilio account at https://www.twilio.com
 * 2. Enable WhatsApp messaging in your Twilio console
 * 3. Get your Account SID and Auth Token from the Twilio console
 * 4. Add these environment variables to your .env file:
 *    TWILIO_ACCOUNT_SID=your_account_sid
 *    TWILIO_AUTH_TOKEN=your_auth_token
 *    TWILIO_WHATSAPP_FROM=whatsapp:+14155238886 (Twilio's sandbox number or your approved number)
 *    WHATSAPP_TO=whatsapp:+40773386299 (Your WhatsApp number)
 *
 * For production, you'll need to request approval for your WhatsApp number from Twilio.
 */

interface WhatsAppMessage {
  formType: string;
  data: any;
  submittedAt: string;
}

export async function sendWhatsAppNotification(formType: string, formData: any): Promise<boolean> {
  try {
    // Check if WhatsApp is configured
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_FROM;
    const to = process.env.WHATSAPP_TO;

    if (!accountSid || !authToken || !from || !to) {
      console.warn('WhatsApp not configured. Skipping notification.');
      console.warn('Required env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, WHATSAPP_TO');
      return false;
    }

    // Format the message based on form type
    const message = formatWhatsAppMessage(formType, formData);

    // Send via Twilio WhatsApp API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: from,
          To: to,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('WhatsApp send error:', error);
      return false;
    }

    console.log('WhatsApp notification sent successfully');
    return true;
  } catch (error) {
    console.error('WhatsApp service error:', error);
    return false;
  }
}

function formatWhatsAppMessage(formType: string, formData: any): string {
  const timestamp = new Date().toLocaleString('ro-RO', {
    timeZone: 'Europe/Bucharest',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  let message = `🔔 *Formular Nou: ${getFormTypeName(formType)}*\n\n`;
  message += `📅 Data: ${timestamp}\n\n`;

  // Format data based on form type
  switch (formType) {
    case 'contact':
      message += `👤 Nume: ${formData.name || 'N/A'}\n`;
      message += `📧 Email: ${formData.email || 'N/A'}\n`;
      message += `📱 Telefon: ${formData.phone || 'N/A'}\n`;
      message += `💬 Mesaj: ${formData.message || 'N/A'}\n`;
      break;

    case 'quote':
      message += `👤 Nume: ${formData.name || 'N/A'}\n`;
      message += `📧 Email: ${formData.email || 'N/A'}\n`;
      message += `📱 Telefon: ${formData.phone || 'N/A'}\n`;
      message += `🏢 Companie: ${formData.company || 'N/A'}\n`;
      message += `⚡ Serviciu: ${formData.service || 'N/A'}\n`;
      message += `📝 Detalii: ${formData.details || 'N/A'}\n`;
      break;

    case 'configurator':
      message += `👤 Nume: ${formData.name || 'N/A'}\n`;
      message += `📧 Email: ${formData.email || 'N/A'}\n`;
      message += `📱 Telefon: ${formData.phone || 'N/A'}\n`;
      message += `⚙️ Configurație: ${JSON.stringify(formData.configuration, null, 2)}\n`;
      break;

    default:
      // Generic format for unknown form types
      Object.keys(formData).forEach(key => {
        const value = typeof formData[key] === 'object'
          ? JSON.stringify(formData[key])
          : formData[key];
        message += `${key}: ${value}\n`;
      });
  }

  message += `\n---\nSelectrik - Soluții Electrice Profesionale`;

  return message;
}

function getFormTypeName(formType: string): string {
  const typeNames: Record<string, string> = {
    'contact': 'Contact',
    'quote': 'Cerere Ofertă',
    'configurator': 'Configurator Proiect',
    'bransament': 'Cerere Branșament',
    'fotovoltaic': 'Cerere Sistem Fotovoltaic',
  };

  return typeNames[formType] || formType.charAt(0).toUpperCase() + formType.slice(1);
}

// Alternative: Simple webhook-based approach (if you prefer not to use Twilio)
// You can use services like:
// - Twilio (recommended, most reliable)
// - WhatsApp Business API (requires approval)
// - Third-party services like MessageBird, Vonage
// - Self-hosted solutions like whatsapp-web.js (less reliable, can be blocked)

export async function sendWhatsAppViaWebhook(formType: string, formData: any): Promise<boolean> {
  try {
    const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('WhatsApp webhook not configured. Skipping notification.');
      return false;
    }

    const message = formatWhatsAppMessage(formType, formData);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: process.env.WHATSAPP_TO,
        message: message,
        formType: formType,
        formData: formData,
      }),
    });

    if (!response.ok) {
      console.error('WhatsApp webhook error:', await response.text());
      return false;
    }

    console.log('WhatsApp notification sent via webhook');
    return true;
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return false;
  }
}
