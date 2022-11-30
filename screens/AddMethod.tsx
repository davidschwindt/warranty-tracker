import { StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function AddMethod({
  navigation,
}: RootStackScreenProps<'AddMethod'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Purchase Method</Text>
      <Pressable
        onPress={() => navigation.replace('PurchaseMethods')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Back to all purchasse methods</Text>
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
