import { Image, Pressable } from 'react-native';
import { View, Text, useThemeColor } from './Themed';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SvgXml } from 'react-native-svg';
import CameraIcon from '../assets/icons/cameraLens4.svg';
import TrashIcon from '../assets/icons/trash.svg';

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
        <Pressable
          onPress={openImagePicker}
          style={{ backgroundColor: 'black', padding: 12 }}
        >
          <Text style={{ color: 'white' }}>Browse...</Text>
        </Pressable>

        <Pressable onPress={openCamera}>
          <SvgXml
            xml={CameraIcon}
            fill="grey"
            stroke="grey"
            width={30}
            height={30}
          />
        </Pressable>

        <Pressable onPress={handleDelete}>
          <SvgXml xml={TrashIcon} fill="grey" width={30} height={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default ImageInput;
