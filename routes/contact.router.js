import express from 'express'
import { contactForm } from '../controllers/contact.controller.js';

const router = express.Router();

// /api/v1/mail/sendmail
router.post('/sendmail',contactForm)

export default router