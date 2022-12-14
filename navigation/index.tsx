import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useThemeColor } from '../components/Themed';
import AddItem from '../screens/AddItem';
import AddMethod from '../screens/AddMethod';
import Home from '../screens/Home';
import PurchaseMethods from '../screens/PurchaseMethods';
import ViewItem from '../screens/ViewItem';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  return (
    <DrawerContentScrollView style={{ flex: 1 }}>
      <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
      <DrawerItem
        label="Add Item"
        onPress={() =>
          navigation.navigate('Add Item', {
            id: undefined,
            key: Date.now(),
          })
        }
      />
      <DrawerItem
        label="Add Purchase Method"
        onPress={() => navigation.navigate('Add Purchase Method')}
      />
      <DrawerItem
        label="Purchase Methods"
        onPress={() => navigation.navigate('Purchase Methods')}
      />
    </DrawerContentScrollView>
  );
};

function RootNavigator() {
  const color = useThemeColor({}, 'text');

  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        unmountOnBlur: true,
        drawerPosition: 'right',
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor={color} />,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ unmountOnBlur: false }}
      />
      <Drawer.Screen
        name="Add Item"
        component={AddItem}
        options={{ title: 'Add/Edit Item' }}
      />
      <Drawer.Screen
        name="View Item"
        component={ViewItem}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Add Purchase Method"
        component={AddMethod}
        options={{ title: 'Add/Edit Purchase Method' }}
      />
      <Drawer.Screen name="Purchase Methods" component={PurchaseMethods} />
    </Drawer.Navigator>
  );
}
