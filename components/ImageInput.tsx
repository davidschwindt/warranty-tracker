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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 75, height: 75, backgroundColor: 'grey' }}>
        {imageUri && !recentlyDeleted && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </View>

      <View
        style={{
          marginLeft: 24,
          width: 200,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable onPress={openImagePicker}>
          <Text>Browse...</Text>
        </Pressable>

        <Pressable onPress={openCamera}>
          <Text>Camera</Text>
        </Pressable>

        <Pressable onPress={handleDelete}>
          <Text>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ImageInput;
