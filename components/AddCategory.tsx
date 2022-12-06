import { useContext } from 'react';
import { items as allItems } from '../data';
import { View, Text, TextInput } from './Themed';
import { Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from '../types';
import { useState } from 'react';
import { AppData } from '../data/Provider';

const AddCategory: React.FC = () => {
  const { addCategory } = useContext(AppData);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');

  const handleSave = () => {
    addCategory({ label });
    setLabel('');
    setActive(false);
  };

  if (!active) {
    return (
      <Pressable onPress={() => setActive(true)}>
        <Text>Add Category</Text>
      </Pressable>
    );
  }

  return (
    <>
      <TextInput
        placeholder="Category Name"
        value={label}
        onChangeText={setLabel}
      />
      <Pressable onPress={() => setActive(false)}>
        <Text>Cancel</Text>
      </Pressable>
      <Pressable onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
    </>
  );
};

export default AddCategory;
