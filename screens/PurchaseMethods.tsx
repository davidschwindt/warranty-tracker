import { StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function PurchaseMethods({
  navigation,
}: RootStackScreenProps<'PurchaseMethods'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Methods</Text>
      <Pressable
        onPress={() => navigation.replace('AddMethod')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Add a purchase method</Text>
      </Pressable>
      <Pressable onPress={() => navigation.replace('Home')} style={styles.link}>
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
