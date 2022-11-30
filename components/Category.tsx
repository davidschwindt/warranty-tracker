import { items as allItems } from '../data';
import { View, Text } from './Themed';
import { Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from '../types';

const Category: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const nav = useNavigation();

  const items = Object.entries(allItems).filter(
    ([itemId, { category }]) => category === id
  );

  return (
    <View>
      <Text>{label}</Text>
      {items.map(([itemId, { label: itemLabel }]) => (
        <Pressable onPress={() => nav.navigate('ViewItem', { id: itemId })}>
          <Text>{itemLabel}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Category;
