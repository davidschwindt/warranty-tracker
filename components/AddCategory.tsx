import { useContext } from 'react';
import { View, Text, TextInput, useThemeColor } from './Themed';
import { Pressable, StyleSheet } from 'react-native';
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

  const color = useThemeColor({}, 'text');

  if (!active) {
    return (
      <View style={{ alignItems: 'flex-start' }}>
        <Pressable
          onPress={() => setActive(true)}
          style={[styles.addButton, { borderColor: color }]}
        >
          <Text>+ Category</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Category Name"
        value={label}
        onChangeText={setLabel}
      />
      <Pressable
        onPress={() => setActive(false)}
        style={[styles.button, { backgroundColor: 'grey' }]}
      >
        <Text>Cancel</Text>
      </Pressable>
      <Pressable
        onPress={handleSave}
        style={[styles.button, { backgroundColor: 'green' }]}
      >
        <Text>Save</Text>
      </Pressable>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    borderWidth: 1,
    padding: 12,
  },
  button: {
    marginHorizontal: 12,
    padding: 12,
  },
});
