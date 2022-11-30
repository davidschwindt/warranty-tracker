import { StyleSheet, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { RootStackParamList, RootStackScreenProps } from '../types';
import { items } from '../data';

export default function ViewItem({
  navigation,
}: RootStackScreenProps<'ViewItem'>) {
  const { params } = useRoute();
  const id = params?.id;
  if (!id) {
    return <Text>No item found</Text>;
  }

  const { label } = items[id];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
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
