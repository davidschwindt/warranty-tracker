import { useContext, Dispatch, SetStateAction } from 'react';
import Dropdown from 'react-native-dropdown-picker';
import { View, Text, TextInput, useThemeColor } from './Themed';
import { Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { AppData, createId } from '../data/Provider';

const AddCategory: React.FC<{
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}> = ({ value, onChange }) => {
  const { addCategory, categories } = useContext(AppData);
  const [addActive, setAddActive] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [label, setLabel] = useState('');

  const handleSave = () => {
    const id = createId();
    addCategory({ id, label });
    onChange(id);
    setLabel('');
    setAddActive(false);
  };

  const color = useThemeColor({}, 'text');

  if (!addActive) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Dropdown
          placeholder="Select a category"
          open={selectorOpen}
          setOpen={setSelectorOpen}
          value={value}
          setValue={onChange}
          items={Object.values(categories).map(({ id: value, label }) => ({
            value,
            label,
          }))}
          containerStyle={{ width: 200 }}
        />
        <Pressable
          onPress={() => {
            setAddActive(true);
            setSelectorOpen(false);
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderWidth: 1,
            borderColor: color,
            marginLeft: 12,
          }}
        >
          <Text>+ Add</Text>
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
        onPress={() => setAddActive(false)}
        style={[styles.button, { backgroundColor: 'grey' }]}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </Pressable>
      <Pressable
        onPress={handleSave}
        style={[styles.button, { backgroundColor: 'green' }]}
      >
        <Text style={styles.buttonText}>Save</Text>
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
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});
