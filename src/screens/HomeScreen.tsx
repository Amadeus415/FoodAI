// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { analyzeImage } from '../services/api';
import { auth, firestore } from '../services/firebase';

const HomeScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [labels, setLabels] = useState<any[]>([]);

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo' }, async (response) => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setPhoto(asset.uri || '');

        // Convert image to base64
        const base64Image = await fetch(asset.uri || '')
          .then((res) => res.blob())
          .then((blob) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }))
          .then((dataUrl) => dataUrl.replace(/^data:image\/[a-z]+;base64,/, ''));

        // Analyze image
        const result = await analyzeImage(base64Image);
        setLabels(result);

        // Save to Firestore
        const userId = auth().currentUser?.uid;
        if (userId) {
          firestore()
            .collection('users')
            .doc(userId)
            .collection('entries')
            .add({
              photoUri: asset.uri,
              labels: result,
              timestamp: firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    });
  };

  return (
    <View>
      <Button title="Take Photo" onPress={takePhoto} />
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
      {labels.length > 0 && (
        <View>
          <Text>Detected Items:</Text>
          {labels.map((label, index) => (
            <Text key={index}>{label.description}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
