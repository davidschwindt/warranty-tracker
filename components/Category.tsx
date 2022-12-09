import { useContext, useState } from 'react';
import { Text, TextInput, useThemeColor, View } from './Themed';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppData } from '../data/Provider';

const Category: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const nav = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [shouldShowOptions, setShouldShowOptions] = useState(false);
  const [editIsActive, setEditIsActive] = useState(false);
  const [categoryInput, setCategoryInput] = useState(label);
  const { items: allItems, deleteCategory, editCategory } = useContext(AppData);
  const handleDelete = () => deleteCategory(id);

  const items = Object.values(allItems).filter(
    ({ category }) => category === id
  );

  if (id === '' && !items.length) {
    return null;
  }

  const handleCategoryPress = () => {
    if (shouldShowOptions) {
      setShouldShowOptions(false);
    } else {
      setExpanded(!expanded);
    }
  };

  const handleLongPress = () => {
    setShouldShowOptions(!shouldShowOptions);
    setExpanded(false);
  };

  const handleCancelEdit = () => {
    setEditIsActive(false);
    setShouldShowOptions(false);
  };

  const handleSaveEdit = () => {
    editCategory({ id, label: categoryInput });
    setEditIsActive(false);
    setShouldShowOptions(false);
  };

  return (
    <>
      <Pressable
        onPress={handleCategoryPress}
        onLongPress={handleLongPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {editIsActive ? (
            <>
              <TextInput
                placeholder="Category Name"
                value={categoryInput}
                onChangeText={setCategoryInput}
                style={{ minWidth: 100 }}
              />
              <Pressable
                onPress={handleCancelEdit}
                style={{
                  backgroundColor: 'grey',
                  padding: 8,
                  marginHorizontal: 12,
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSaveEdit}
                style={{
                  backgroundColor: 'green',
                  padding: 8,
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.categoryLabel}>
                {label || 'Untitled'} ({items.length})
              </Text>

              {shouldShowOptions ? (
                <>
                  <Pressable
                    onPress={() => setEditIsActive(true)}
                    style={{
                      backgroundColor: 'green',
                      padding: 8,
                      marginRight: 12,
                    }}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleDelete}
                    style={{ backgroundColor: 'red', padding: 8 }}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
                </>
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
            </>
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
          {/* <Pressable
            onPress={() => nav.navigate('AddItem', { categoryId: id })}
            style={[styles.addButton, { borderColor: color }]}
          >
            <Text style={{ fontSize: 24, lineHeight: 30 }}>+</Text>
          </Pressable> */}
        </View>
      )}
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryLabel: {
    fontSize: 24,
    marginRight: 24,
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
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});
