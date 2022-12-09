import { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Text, useThemeColor, View } from '../components/Themed';
import { AppData } from '../data/Provider';
import { RootStackScreenProps } from '../types';
import CreditCardIcon from '../assets/icons/creditCard.svg';

export default function PurchaseMethods({
  navigation,
}: RootStackScreenProps<'PurchaseMethods'>) {
  const { purchaseMethods } = useContext(AppData);
  const color = useThemeColor({}, 'text');
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={styles.linkText}>{'<-- Back'}</Text>
      </Pressable>
      <Text style={styles.title}>Purchase Methods</Text>
      {Object.values(purchaseMethods).map(({ id, description }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={CreditCardIcon}
            width={60}
            height={60}
            stroke={color}
            style={{ marginRight: 8 }}
          />
          <Pressable onPress={() => navigation.navigate('AddMethod', { id })}>
            <Text style={styles.text}>{description}</Text>
          </Pressable>
        </View>
      ))}
      <Pressable
        onPress={() => navigation.navigate('AddMethod')}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}
        >
          <View
            style={{
              borderColor: color,
              borderWidth: 1.5,
              borderRadius: 4,
              width: '70%',
              height: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: '500', fontSize: 18 }}>+</Text>
          </View>
        </View>
        <Text style={styles.linkText}>Add a purchase method</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 48,
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
    fontSize: 18,
    color: '#2e78b7',
  },
  text: {
    fontSize: 18,
  },
});
