import { Camera, CameraType } from 'expo-camera';
import { useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';

const AddImage: React.FC<{
  setImageUri: (imageUri: string) => void;
  close: () => void;
}> = ({ setImageUri, close }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>();

  if (!permission?.granted) {
    requestPermission().then((newPermission) =>
      console.log('newPermission', newPermission)
    );
  }

  const handleCapture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    console.log('photo', photo?.uri);
    setImageUri(photo?.uri);
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.front}
        onCameraReady={() => console.log('ready')}
        onMountError={(error) => console.log('error', error)}
      />
      <Pressable onPress={handleCapture} style={styles.captureButton} />
      <Pressable onPress={close} style={styles.closeButton}>
        <Text>Close</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  captureButton: {
    position: 'absolute',
    bottom: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  closeButton: {
    position: 'absolute',
    top: 36,
    left: 24,
    backgroundColor: 'white',
    padding: 12,
  },
});

export default AddImage;
