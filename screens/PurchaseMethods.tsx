import { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Text, useThemeColor, View } from '../components/Themed';
import { AppData } from '../data/Provider';
import { RootStackScreenProps } from '../types';
import CreditCardIcon from '../assets/icons/creditCard.svg';

export default function PurchaseMethods({
  navigation,
}: RootStackScreenProps<'Purchase Methods'>) {
  const { purchaseMethods } = useContext(AppData);
  const color = useThemeColor({}, 'text');
  return (
    <View style={styles.container}>
      {Object.values(purchaseMethods).map(({ id, description, lastFour }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={CreditCardIcon}
            width={60}
            height={60}
            stroke={color}
            style={{ marginRight: 8 }}
          />
          <Pressable
            onPress={() => navigation.navigate('Add Purchase Method', { id })}
          >
            <Text style={styles.text}>
              {description} {lastFour ? `(${lastFour})` : ''}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
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
