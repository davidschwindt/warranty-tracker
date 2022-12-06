import { Image, Pressable } from 'react-native';
import { View, Text } from './Themed';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  imageUri?: string;
  onImageSelected: (imageUri: string) => void;
  onDelete: () => void;
};

const ImageInput: React.FC<Props> = ({
  imageUri,
  onImageSelected,
  onDelete,
}) => {
  const [recentlyDeleted, setRecentlyDeleted] = useState(false);
  const [libraryPermissionStatus, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const openImagePicker = async () => {
    if (!libraryPermissionStatus?.granted) {
      await requestLibraryPermission();
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    if (!cameraPermissionStatus?.granted) {
      await requestCameraPermission();
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const handleDelete = () => {
    setRecentlyDeleted(true);
    onDelete();
  };

  useEffect(() => {
    if (recentlyDeleted) {
      setRecentlyDeleted(false);
    }
  }, [imageUri]);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Pressable onPress={openCamera}>
        <Text>Open Camera</Text>
      </Pressable>

      <Pressable onPress={openImagePicker}>
        <Text>Open Gallery</Text>
      </Pressable>

      {imageUri && !recentlyDeleted && (
        <Image source={{ uri: imageUri }} style={{ width: 50, height: 50 }} />
      )}

      <Pressable onPress={handleDelete}>
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
};

export default ImageInput;
