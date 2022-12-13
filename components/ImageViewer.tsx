import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { Pressable } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { View, Text } from './Themed';

type Props = {
  imageUrls: string[];
  index: number;
  onClose: () => void;
};

const Viewer: React.FC<Props> = ({ imageUrls, index, onClose }) => (
  <View
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
    }}
  >
    <ImageViewer
      imageUrls={imageUrls.map((url) => ({ url }))}
      index={index}
      enableSwipeDown
      onSwipeDown={onClose}
      onCancel={onClose}
    />
    <View
      style={{
        position: 'absolute',
        bottom: 48,
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <Pressable
        onPress={onClose}
        style={{
          backgroundColor: 'white',
          padding: 12,
          marginHorizontal: 24,
        }}
      >
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>
          Close
        </Text>
      </Pressable>
    </View>
  </View>
);

export default Viewer;
