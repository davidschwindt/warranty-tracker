import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import Category from '../components/Category';
import { useContext } from 'react';
import { AppData } from '../data/Provider';
import AddCategory from '../components/AddCategory';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const { categories, items } = useContext(AppData);

  console.log('items', items);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Warranty Tracker</Text>
        <Pressable
          onPress={() => navigation.navigate('PurchaseMethods')}
          style={{ marginVertical: 25 }}
        >
          <Text>{'Purchase\nMethods'}</Text>
        </Pressable>
      </View>
      {Object.values(categories).map(({ id, label }) => (
        <View style={{ marginVertical: 12 }}>
          <Category id={id} label={label} />
        </View>
      ))}
      <View style={{ marginVertical: 12 }}>
        <Category id="" label="Uncategorized" />
      </View>
      <View style={{ marginVertical: 24 }}>
        <AddCategory />
      </View>
      <Pressable
        onPress={() => navigation.navigate('AddItem')}
        style={styles.addItemButton}
      >
        <Text style={{ fontSize: 40, lineHeight: 60, textAlign: 'center' }}>
          +
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: '20%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  addItemButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 36,
    backgroundColor: 'green',
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});
