import { useContext, useState } from 'react';
import { Text, View } from './Themed';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppData } from '../data/Provider';

const Category: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const nav = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [deleteIsActive, setDeleteIsActive] = useState(false);
  const { items: allItems, deleteCategory } = useContext(AppData);
  const handleDelete = () => deleteCategory(id);

  const items = Object.values(allItems).filter(
    ({ category }) => category === id
  );

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={() => setExpanded(!expanded)}
          onLongPress={() => setDeleteIsActive(!deleteIsActive)}
        >
          <Text>{label}</Text>
        </Pressable>
        <Text>({items.length})</Text>
        {deleteIsActive && (
          <Pressable onPress={handleDelete}>
            <Text>Delete</Text>
          </Pressable>
        )}
      </View>
      {expanded && (
        <>
          <Pressable
            onPress={() => nav.navigate('AddItem', { categoryId: id })}
          >
            <Text>Add Item</Text>
          </Pressable>
          {items.map(({ id: itemId, description: itemLabel }) => (
            <Pressable onPress={() => nav.navigate('ViewItem', { id: itemId })}>
              <Text>{itemLabel}</Text>
            </Pressable>
          ))}
        </>
      )}
    </>
  );
};

export default Category;
