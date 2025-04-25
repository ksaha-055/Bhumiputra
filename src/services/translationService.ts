import axios from 'axios';

const API_BASE_URL = 'https://api.mymemory.translated.net/get';

export const translateText = async (text: string, fromLang: string, toLang: string) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        q: text,
        langpair: `${fromLang}|${toLang}`,
      },
    });

    if (response.data && response.data.responseData) {
      return response.data.responseData.translatedText;
    }
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export const getTranslations = async (language: string) => {
  try {
    // In a real application, you would fetch translations from your backend
    // For now, we'll use a mock API response
    const response = await axios.get(`/api/translations/${language}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching translations:', error);
    return {};
  }
}; 