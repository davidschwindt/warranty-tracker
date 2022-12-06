import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import Category from '../components/Category';
import { useContext } from 'react';
import { AppData } from '../data/Provider';
import AddCategory from '../components/AddCategory';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const { categories } = useContext(AppData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warranty Tracker</Text>
      <Pressable
        onPress={() => navigation.navigate('PurchaseMethods')}
        style={{ marginVertical: 25 }}
      >
        <Text>Purchase Methods</Text>
      </Pressable>
      {Object.values(categories).map(({ id, label }) => (
        <View style={{ marginVertical: 12 }}>
          <Category id={id} label={label} />
        </View>
      ))}
      <AddCategory />
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
