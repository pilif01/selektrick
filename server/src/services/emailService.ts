import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  from: {
    name: 'Blueprint Studio Works',
    address: process.env.EMAIL_USER || 'noreply@selectrik.ro',
  },
});

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  const mailOptions = {
    from: '"Blueprint Studio Works" <' + process.env.EMAIL_USER + '>',
    to: email,
    subject: 'Selectrik - Verificare Email',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #1a1a1a 0%, #111827 50%, #000000 100%);">
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
          
          <!-- Header with beautiful gradient -->
          <div style="background: linear-gradient(135deg, #2B5FA5 0%, #1a4a82 50%, #0B5FA5 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden;">
            <!-- Decorative circles -->
            <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(232, 230, 131, 0.1); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(232, 230, 131, 0.1); border-radius: 50%;"></div>
            
            <div style="position: relative; z-index: 1;">
              <div style="background: linear-gradient(135deg, #E8E683 0%, #d4c46f 100%); width: 90px; height: 90px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(232, 230, 131, 0.4);">
                <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#2B5FA5" stroke="#2B5FA5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="color: #E8E683; margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 3px; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">SELECTRIK</h1>
              <p style="color: #ffffff; margin: 12px 0 0; font-size: 15px; opacity: 0.95;">Instalatii Electrice Profesionale</p>
            </div>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2B5FA5; margin: 0 0 20px; font-size: 24px;">Bun venit!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Multumim ca ai ales <strong style="color: #2B5FA5;">Selectrik</strong>! Pentru a finaliza crearea contului tau, te rugam sa introduci codul de verificare de mai jos:
            </p>
            
            <!-- Verification Code Box with beautiful gradient -->
            <div style="background: linear-gradient(135deg, #2B5FA5 0%, #1a4a82 25%, #0B5FA5 50%, #1a4a82 75%, #2B5FA5 100%); border-radius: 16px; padding: 35px; text-align: center; margin: 30px 0; box-shadow: 0 10px 30px rgba(43, 95, 165, 0.3); position: relative; overflow: hidden;">
              <!-- Decorative shine effect -->
              <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(232, 230, 131, 0.1) 0%, transparent 70%); animation: shine 3s ease-in-out infinite;"></div>
              
              <div style="position: relative; z-index: 1;">
                <p style="color: #E8E683; margin: 0 0 20px; font-size: 15px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Codul tau de verificare</p>
                <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%); border: 3px dashed #E8E683; border-radius: 12px; padding: 25px; display: inline-block; box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);">
                  <h1 style="color: #E8E683; margin: 0; font-size: 48px; font-weight: bold; letter-spacing: 12px; font-family: 'Courier New', monospace; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                    ${code}
                  </h1>
                </div>
                <p style="color: rgba(255, 255, 255, 0.8); margin: 20px 0 0; font-size: 13px;">Copiaza codul si introdu-l in pagina de verificare</p>
              </div>
            </div>
            
            <!-- Warning Box -->
            <div style="background-color: #fff3cd; border-left: 4px solid #E8E683; padding: 15px; border-radius: 4px; margin: 25px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                ⏱️ <strong>Important:</strong> Acest cod va expira in 10 minute.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0;">
              Daca nu ai creat un cont pe Selectrik, te rugam sa ignori acest email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <!-- Footer -->
            <div style="text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 5px 0;">
                Cu respect,<br>
                <strong style="color: #2B5FA5;">Echipa Selectrik</strong>
              </p>
              <p style="color: #999; font-size: 11px; margin: 15px 0 5px;">
                SMART ELKISS S.R.L. - Instalator autorizat ANRE
              </p>
              <p style="color: #999; font-size: 11px; margin: 5px 0;">
                Tel: 0773 386 299 | Email: contact@selectrik.ro
              </p>
            </div>
          </div>
          
          <!-- Bottom Bar -->
          <div style="background-color: #2B5FA5; padding: 20px; text-align: center;">
            <p style="color: #E8E683; margin: 0; font-size: 12px; font-weight: bold;">
              Puterea de a ilumina viitorul
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendProjectSubmissionEmail(
  userEmail: string,
  projectName: string,
  projectType: string,
  pdfBase64: string
): Promise<void> {
  // Clean filename (no diacritics)
  const cleanFilename = projectName
    .replace(/[ăâîșț]/g, (match) => ({ 'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't' }[match] || match))
    .replace(/[^a-zA-Z0-9]/g, '_');

  // Email to user (confirmation) with PDF attachment
  const userMailOptions = {
    from: '"Blueprint Studio Works" <' + process.env.EMAIL_USER + '>',
    to: userEmail,
    subject: 'Selectrik - Proiect Trimis cu Succes',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #1a1a1a;">
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2B5FA5 0%, #0B5FA5 100%); padding: 40px 30px; text-align: center;">
            <div style="background-color: #E8E683; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(232, 230, 131, 0.3);">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#2B5FA5" stroke="#2B5FA5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="color: #E8E683; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">SELECTRIK</h1>
            <p style="color: #ffffff; margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Instalatii Electrice Profesionale</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2B5FA5; margin: 0 0 20px; font-size: 24px;">✅ Proiectul tau a fost trimis!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Multumim pentru increderea acordata! Am primit proiectul tau si il vom analiza cu atentie.
            </p>
            
            <!-- Project Details Box -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin: 25px 0; border: 2px solid #E8E683;">
              <h3 style="margin: 0 0 15px; color: #2B5FA5; font-size: 18px;">📋 Detalii proiect:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Nume proiect:</td>
                  <td style="padding: 8px 0; color: #2B5FA5; font-weight: bold; text-align: right;">${projectName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Tip:</td>
                  <td style="padding: 8px 0; color: #2B5FA5; font-weight: bold; text-align: right;">${projectType}</td>
                </tr>
              </table>
            </div>
            
            <!-- PDF Attachment Notice -->
            <div style="background-color: #fff3cd; border-left: 4px solid #E8E683; padding: 15px; border-radius: 4px; margin: 25px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                📄 <strong>Atasament:</strong> Gasesti PDF-ul cu toate detaliile proiectului tau atasat acestui email.
              </p>
            </div>
            
            <!-- Next Steps -->
            <div style="background: linear-gradient(135deg, #2B5FA5 0%, #3A7FC7 100%); border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #E8E683; margin: 0 0 15px; font-size: 18px;">🚀 Urmatoarele Pasi:</h3>
              <ul style="color: #ffffff; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Echipa noastra va analiza proiectul tau</li>
                <li>Vei fi contactat in cel mai scurt timp</li>
                <li>Iti vom trimite o oferta detaliata</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0;">
              Daca ai intrebari, nu ezita sa ne contactezi la numerele de mai jos.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <!-- Footer -->
            <div style="text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 5px 0;">
                Cu respect,<br>
                <strong style="color: #2B5FA5;">Echipa Selectrik</strong>
              </p>
              <p style="color: #999; font-size: 11px; margin: 15px 0 5px;">
                SMART ELKISS S.R.L. - Instalator autorizat ANRE
              </p>
              <p style="color: #999; font-size: 11px; margin: 5px 0;">
                Tel: 0773 386 299 | Email: contact@selectrik.ro
              </p>
            </div>
          </div>
          
          <!-- Bottom Bar -->
          <div style="background-color: #2B5FA5; padding: 20px; text-align: center;">
            <p style="color: #E8E683; margin: 0; font-size: 12px; font-weight: bold;">
              Puterea de a ilumina viitorul
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: `Selectrik_${cleanFilename}.pdf`,
        content: pdfBase64,
        encoding: 'base64',
      },
    ],
  };

  // Email to smart.selectrik@gmail.com with PDF attachment
  const adminMailOptions = {
    from: '"Blueprint Studio Works" <' + process.env.EMAIL_USER + '>',
    to: 'smart.selectrik@gmail.com',
    subject: `[Selectrik] Proiect Nou: ${projectName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #1a1a1a;">
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
            <div style="background-color: #E8E683; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(232, 230, 131, 0.3);">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#10b981" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="color: #E8E683; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">SELECTRIK</h1>
            <p style="color: #ffffff; margin: 10px 0 0; font-size: 14px; opacity: 0.9;">🔔 Notificare Proiect Nou</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #10b981; margin: 0 0 20px; font-size: 24px;">📨 Proiect Nou Primit!</h2>
            
            <!-- Client Info Box -->
            <div style="background: linear-gradient(135deg, #E8E683 0%, #d4c46f 100%); border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h3 style="margin: 0 0 15px; color: #2B5FA5; font-size: 18px;">👤 Informatii Client:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #2B5FA5; font-weight: bold; text-align: right;">${userEmail}</td>
                </tr>
              </table>
            </div>
            
            <!-- Project Details Box -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin: 25px 0; border: 2px solid #2B5FA5;">
              <h3 style="margin: 0 0 15px; color: #2B5FA5; font-size: 18px;">📋 Detalii Proiect:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Nume proiect:</td>
                  <td style="padding: 8px 0; color: #2B5FA5; font-weight: bold; text-align: right;">${projectName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Tip:</td>
                  <td style="padding: 8px 0; color: #10b981; font-weight: bold; text-align: right;">${projectType}</td>
                </tr>
              </table>
            </div>
            
            <!-- PDF Notice -->
            <div style="background-color: #fff3cd; border-left: 4px solid #E8E683; padding: 15px; border-radius: 4px; margin: 25px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                📄 <strong>Atasament:</strong> Toate detaliile complete ale proiectului sunt in PDF-ul atasat.
              </p>
            </div>
            
            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #2B5FA5 0%, #3A7FC7 100%); border-radius: 12px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #E8E683; margin: 0 0 15px; font-size: 18px;">⚡ Actiuni Necesare:</h3>
              <ul style="color: #ffffff; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Analizeaza proiectul atasat</li>
                <li>Contacteaza clientul pentru detalii</li>
                <li>Pregateste oferta personalizata</li>
              </ul>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <!-- Footer -->
            <div style="text-align: center;">
              <p style="color: #999; font-size: 11px; margin: 15px 0 5px;">
                SMART ELKISS S.R.L. - Instalator autorizat ANRE
              </p>
              <p style="color: #999; font-size: 11px; margin: 5px 0;">
                Tel: 0773 386 299 | Email: contact@selectrik.ro
              </p>
            </div>
          </div>
          
          <!-- Bottom Bar -->
          <div style="background-color: #10b981; padding: 20px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 12px; font-weight: bold;">
              Dashboard Admin - Selectrik
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: `Selectrik_${cleanFilename}.pdf`,
        content: pdfBase64,
        encoding: 'base64',
      },
    ],
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(userMailOptions),
    transporter.sendMail(adminMailOptions),
  ]);
}
