import express, { Request, Response } from 'express';
import { FormSubmissionModel } from '../models/FormSubmission.js';
import { sendWhatsAppNotification } from '../services/whatsappService.js';

const router = express.Router();

// Submit a form (public endpoint - no authentication required)
router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { formType, data } = req.body;

    if (!formType || !data) {
      return res.status(400).json({ error: 'Tip formular și date sunt obligatorii' });
    }

    // Validate form type
    const validFormTypes = ['contact', 'quote', 'configurator', 'bransament', 'fotovoltaic', 'other'];
    if (!validFormTypes.includes(formType)) {
      return res.status(400).json({ error: 'Tip formular invalid' });
    }

    // Basic validation for required fields based on form type
    if (formType === 'contact' || formType === 'quote') {
      if (!data.email || !data.name) {
        return res.status(400).json({ error: 'Email și nume sunt obligatorii' });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return res.status(400).json({ error: 'Email invalid' });
      }
    }

    // Save form submission to database
    const submissionId = FormSubmissionModel.create(formType, data);

    // Try to send WhatsApp notification (non-blocking)
    sendWhatsAppNotification(formType, data)
      .then(sent => {
        if (sent) {
          FormSubmissionModel.markWhatsAppSent(submissionId);
          console.log(`WhatsApp notification sent for submission ${submissionId}`);
        }
      })
      .catch(error => {
        console.error('WhatsApp notification failed:', error);
      });

    res.status(201).json({
      message: 'Formular trimis cu succes',
      submissionId,
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ error: 'Eroare la trimiterea formularului' });
  }
});

// Retry sending WhatsApp for failed submissions (admin endpoint - can be called manually or via cron)
router.post('/retry-whatsapp', async (req: Request, res: Response) => {
  try {
    const pendingSubmissions = FormSubmissionModel.getPendingWhatsApp();

    if (pendingSubmissions.length === 0) {
      return res.json({ message: 'Nu există notificări WhatsApp în așteptare' });
    }

    let successCount = 0;
    let failCount = 0;

    for (const submission of pendingSubmissions) {
      const formData = JSON.parse(submission.data);
      const sent = await sendWhatsAppNotification(submission.form_type, formData);

      if (sent) {
        FormSubmissionModel.markWhatsAppSent(submission.id);
        successCount++;
      } else {
        failCount++;
      }
    }

    res.json({
      message: 'Procesare finalizată',
      success: successCount,
      failed: failCount,
      total: pendingSubmissions.length,
    });
  } catch (error) {
    console.error('WhatsApp retry error:', error);
    res.status(500).json({ error: 'Eroare la retrimiterea notificărilor WhatsApp' });
  }
});

export default router;
