import { StyleSheet, Pressable } from 'react-native';
import { Text, View, ScrollView, useThemeColor } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import Category from '../components/Category';
import { useContext, useState } from 'react';
import { AppData } from '../data/Provider';
import { SvgXml } from 'react-native-svg';
import CreditCardIcon from '../assets/icons/creditCard.svg';
import PlusIcon from '../assets/icons/plus.svg';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const { categories, items } = useContext(AppData);
  const [addActive, setAddActive] = useState(false);
  const color = useThemeColor({}, 'text');

  const noItems = Object.values(items).length === 0;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Warranty Tracker</Text>
        <Pressable
          onPress={() => navigation.navigate('PurchaseMethods')}
          style={{ marginVertical: 25 }}
        >
          <SvgXml xml={CreditCardIcon} width={60} height={60} stroke={color} />
        </Pressable>
      </View>
      {noItems && (
        <Pressable
          onPress={() => navigation.navigate('AddItem')}
          style={{ backgroundColor: 'green', padding: 12, width: 150 }}
        >
          <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>
            Add an item!
          </Text>
        </Pressable>
      )}
      {Object.values(categories)
        .sort((a, b) => (b.label > a.label ? -1 : 1))
        .map(({ id, label }) => (
          <View style={{ marginVertical: 12 }}>
            <Category id={id} label={label} />
          </View>
        ))}
      <View style={{ marginVertical: 12 }}>
        <Category id="" label="Uncategorized" />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 36,
          right: 36,
          alignItems: 'flex-end',
        }}
      >
        {addActive && (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate('AddItem');
                setAddActive(false);
              }}
              style={{}}
            >
              <Text style={{ fontSize: 20 }}>Item</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('AddMethod');
                setAddActive(false);
              }}
              style={{
                marginVertical: 12,
                borderTopColor: color,
                borderTopWidth: 1,
                paddingVertical: 12,
              }}
            >
              <Text style={{ fontSize: 20 }}>Purchase Method</Text>
            </Pressable>
          </>
        )}
        <Pressable
          onPress={() => setAddActive(!addActive)}
          style={styles.addItemButton}
        >
          <SvgXml xml={PlusIcon} width={22} height={22} fill="white" />
        </Pressable>
      </View>
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
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 100,
    paddingTop: 2,
  },
});
