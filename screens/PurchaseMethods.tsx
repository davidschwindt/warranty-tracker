import { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { AppData } from '../data/Provider';
import { RootStackScreenProps } from '../types';

export default function PurchaseMethods({
  navigation,
}: RootStackScreenProps<'PurchaseMethods'>) {
  const { purchaseMethods } = useContext(AppData);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Methods</Text>
      {Object.values(purchaseMethods).map(({ id, description }) => (
        <Pressable onPress={() => navigation.navigate('AddMethod', { id })}>
          <Text>{description}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={() => navigation.navigate('AddMethod')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Add a purchase method</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Pressable>
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
