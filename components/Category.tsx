import { useContext, useState } from 'react';
import { Text, useThemeColor, View } from './Themed';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
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

  const color = useThemeColor({}, 'text');

  if (id === '' && !items.length) {
    return null;
  }

  return (
    <>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        onLongPress={() => setDeleteIsActive(!deleteIsActive)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={styles.categoryLabel}>
          {label} ({items.length})
        </Text>
        <View style={{ marginLeft: 24 }}>
          {deleteIsActive ? (
            <Pressable onPress={handleDelete}>
              <Text>Delete</Text>
            </Pressable>
          ) : (
            <Text
              style={{
                fontSize: 24,
                transform: [{ rotate: expanded ? '90deg' : '0deg' }],
              }}
            >
              {'>'}
            </Text>
          )}
        </View>
      </Pressable>
      {expanded && (
        <View style={{ alignItems: 'flex-start' }}>
          {items.map(({ id: itemId, description: itemLabel }) => (
            <Pressable onPress={() => nav.navigate('ViewItem', { id: itemId })}>
              <Text style={styles.itemLabel}>{itemLabel}</Text>
            </Pressable>
          ))}
          <Pressable
            onPress={() => nav.navigate('AddItem', { categoryId: id })}
            style={[styles.addButton, { borderColor: color }]}
          >
            <Text style={{ fontSize: 24, lineHeight: 30 }}>+</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryLabel: {
    fontSize: 24,
  },
  addButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 30,
    height: 30,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  itemLabel: {
    marginVertical: 8,
    marginHorizontal: 12,
    fontSize: 20,
    fontWeight: '300',
  },
});
