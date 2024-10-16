// src/services/api.ts
import axios from 'axios';

const GOOGLE_VISION_API_KEY = 'AIzaSyDqolaRnK4QErOvafWJg7p1SovzIc6XNNk';

export const analyzeImage = async (base64Image: string) => {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;

  const body = {
    requests: [
      {
        image: {
          content: base64Image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 5,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, body);
    return response.data.responses[0].labelAnnotations;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// src/services/api.ts (Add the following function)
export const processData = async (data: any) => {
  const CLOUD_FUNCTION_URL = 'https://YOUR_CLOUD_FUNCTION_URL/process-data';

  try {
    const response = await axios.post(CLOUD_FUNCTION_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error calling cloud function:', error);
    throw error;
  }
};

