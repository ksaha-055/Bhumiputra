import express from 'express';
import translationsRouter from './translations';

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api', translationsRouter);

app.listen(PORT, () => {
  console.log(`Translation server running on port ${PORT}`);
}); 