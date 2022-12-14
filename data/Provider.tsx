import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import Item, { Category } from '../types/Item';
import PurchaseMethod from '../types/PurchaseMethod';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createId = () => Date.now().toString();

type AppDataProps = {
  items: Record<string, Item>;
  addItem: (data: Omit<Item, 'id'>) => void;
  editItem: (data: Item) => void;
  deleteItem: (id: string) => void;
  categories: Record<string, Category>;
  addCategory: (data: Category) => void;
  editCategory: (data: Category) => void;
  deleteCategory: (id: string) => void;
  purchaseMethods: Record<string, PurchaseMethod>;
  addPurchaseMethod: (data: Omit<PurchaseMethod, 'id'>) => void;
  editPurchaseMethod: (data: PurchaseMethod) => void;
  deletePurchaseMethod: (id: string) => void;
};

export const AppData = createContext<AppDataProps>({
  items: {},
  addItem: (data: Omit<Item, 'id'>) => null,
  editItem: (data: Item) => null,
  deleteItem: (id: string) => null,
  categories: {},
  addCategory: (data: Category) => null,
  editCategory: (data: Category) => null,
  deleteCategory: (id: string) => null,
  purchaseMethods: {},
  addPurchaseMethod: (data: Omit<PurchaseMethod, 'id'>) => null,
  editPurchaseMethod: (data: PurchaseMethod) => null,
  deletePurchaseMethod: (id: string) => null,
});

const AppDataProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [items, setItems] = useState<Record<string, Item>>({});
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [purchaseMethods, setPurchaseMethods] = useState<
    Record<string, PurchaseMethod>
  >({});

  const addItem = (data: Omit<Item, 'id'>) => {
    const id = createId();
    const newItems = { ...items, [id]: { id, ...data } };
    setItems(newItems);
    AsyncStorage.setItem('@items', JSON.stringify(newItems));
  };

  const editItem = (data: Item) => {
    const newItems = { ...items, [data.id]: data };
    setItems(newItems);
    AsyncStorage.setItem('@items', JSON.stringify(newItems));
  };

  const deleteItem = (id: string) => {
    const newItems = { ...items };
    delete newItems[id];
    setItems(newItems);
    AsyncStorage.setItem('@items', JSON.stringify(newItems));
  };

  const addCategory = (data: Category) => {
    const newCategories = { ...categories, [data.id]: data };
    setCategories(newCategories);
    AsyncStorage.setItem('@itemCategories', JSON.stringify(newCategories));
  };

  const editCategory = (data: Category) => {
    const newCategories = { ...categories, [data.id]: data };
    setCategories(newCategories);
    AsyncStorage.setItem('@itemCategories', JSON.stringify(newCategories));
  };

  const deleteCategory = (id: string) => {
    const canDelete = Object.values(items).every(
      ({ category }) => category !== id
    );
    if (!canDelete) {
      alert('Cannot delete category with items');
      return;
    }
    const newCategories = { ...categories };
    delete newCategories[id];
    setCategories(newCategories);
    AsyncStorage.setItem('@itemCategories', JSON.stringify(newCategories));
  };

  const addPurchaseMethod = (data: Omit<PurchaseMethod, 'id'>) => {
    const id = createId();
    const newPurchaseMethods = { ...purchaseMethods, [id]: { id, ...data } };
    setPurchaseMethods(newPurchaseMethods);
    AsyncStorage.setItem(
      '@purchaseMethods',
      JSON.stringify(newPurchaseMethods)
    );
  };

  const editPurchaseMethod = (data: PurchaseMethod) => {
    const newPurchaseMethods = { ...purchaseMethods, [data.id]: data };
    setPurchaseMethods(newPurchaseMethods);
    AsyncStorage.setItem(
      '@purchaseMethods',
      JSON.stringify(newPurchaseMethods)
    );
  };

  const deletePurchaseMethod = (id: string) => {
    const newPurchaseMethods = { ...purchaseMethods };
    delete newPurchaseMethods[id];
    setPurchaseMethods(newPurchaseMethods);
    AsyncStorage.setItem(
      '@purchaseMethods',
      JSON.stringify(newPurchaseMethods)
    );
  };

  const initData = async () => {
    const storedItems = await AsyncStorage.getItem('@items');
    const storedCategories = await AsyncStorage.getItem('@itemCategories');
    const storedPurchaseMethods = await AsyncStorage.getItem(
      '@purchaseMethods'
    );

    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
    if (storedPurchaseMethods) {
      setPurchaseMethods(JSON.parse(storedPurchaseMethods));
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      editItem,
      deleteItem,
      categories,
      addCategory,
      editCategory,
      deleteCategory,
      purchaseMethods,
      addPurchaseMethod,
      editPurchaseMethod,
      deletePurchaseMethod,
    }),
    [items, categories, purchaseMethods]
  );

  return <AppData.Provider value={contextValue}>{children}</AppData.Provider>;
};

export default AppDataProvider;
