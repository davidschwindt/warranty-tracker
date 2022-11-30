import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { categories } from '../data';
import { RootStackScreenProps } from '../types';
import Category from '../components/Category';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Home page</Text>
      <Pressable
        onPress={() => navigation.replace('PurchaseMethods')}
        style={{ marginVertical: 25 }}
      >
        <Text>Purchase Methods</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.replace('AddItem')}
        style={{ marginVertical: 25 }}
      >
        <Text>Add Item</Text>
      </Pressable>
      {Object.entries(categories).map(([id, { label }]) => (
        <View style={{ marginVertical: 12 }}>
          <Category id={id} label={label} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
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
});
