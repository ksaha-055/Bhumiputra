import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

const translations = {
  en: {
    // English translations
    welcome: 'Welcome to Kisan Connect',
    description: 'Empowering farmers with technology',
    // Add more translations
  },
  hi: {
    // Hindi translations
    welcome: 'किसान कनेक्ट में आपका स्वागत है',
    description: 'प्रौद्योगिकी के साथ किसानों को सशक्त बनाना',
    // Add more translations
  },
  bn: {
    // Bengali translations
    welcome: 'কিসান কানেক্টে আপনাকে স্বাগতম',
    description: 'প্রযুক্তির মাধ্যমে কৃষকদের ক্ষমতায়ন',
    // Add more translations
  },
};

app.get('/api/translations/:lang', (req, res) => {
  const lang = req.params.lang as 'en' | 'hi' | 'bn';
  res.json(translations[lang] || {});
});

export default app; 