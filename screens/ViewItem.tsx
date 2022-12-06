import { StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, useThemeColor, View } from '../components/Themed';
import { RootStackParamList, RootStackScreenProps } from '../types';
import { useContext } from 'react';
import { AppData } from '../data/Provider';
import Item, { ExtendedWarrantyStart } from '../types/Item';
import useColorScheme from '../hooks/useColorScheme';
import { Duration, DurationUnit } from '../types/Duration';
import PurchaseMethod from '../types/PurchaseMethod';

type WarrantyStatus = {
  isExpired: string;
  startDate: string;
  endDate: string;
};

const getWarrantyStatus = (
  startDate: Date,
  duration: Duration
): WarrantyStatus => {
  const { numUnits, unit } = duration;
  let endDate = new Date(startDate);
  if (unit === DurationUnit.day) {
    endDate.setDate(endDate.getDate() + numUnits);
  } else if (unit === DurationUnit.month) {
    endDate.setMonth(endDate.getMonth() + numUnits);
  } else if (unit === DurationUnit.year) {
    endDate.setFullYear(endDate.getFullYear() + numUnits);
  }

  const now = new Date();
  return {
    isExpired: endDate < now ? 'EXPIRED' : 'VALID',
    startDate: new Date(startDate).toLocaleDateString(),
    endDate: new Date(endDate).toLocaleDateString(),
  };
};

const getManufacturerWarrantyStatus = (
  item: Item,
  purchaseMethod: PurchaseMethod
) => {
  const { manufacturerWarranty, purchaseDate, extendedWarranty } = item;
  const manufacturerStatus = getWarrantyStatus(
    purchaseDate,
    manufacturerWarranty
  );

  let inStoreExtendedStatus;
  if (extendedWarranty) {
    const inStoreStartDate =
      extendedWarranty.startDate === ExtendedWarrantyStart.expirationDate
        ? new Date(manufacturerStatus.endDate)
        : purchaseDate;
    inStoreExtendedStatus = getWarrantyStatus(
      inStoreStartDate,
      extendedWarranty.duration
    );
  }

  let purchaseMethodExtendedStatus;
  if (purchaseMethod?.extendedWarranty) {
    const purchaseMethodExtendedStartDate =
      purchaseMethod.extendedWarranty.startDate ===
      ExtendedWarrantyStart.expirationDate
        ? new Date(manufacturerStatus.endDate)
        : purchaseDate;
    purchaseMethodExtendedStatus = getWarrantyStatus(
      purchaseMethodExtendedStartDate,
      purchaseMethod.extendedWarranty.duration
    );
  }

  return {
    manufacturerStatus,
    inStoreExtendedStatus,
    purchaseMethodExtendedStatus,
  };
};

export default function ViewItem({
  navigation,
}: RootStackScreenProps<'ViewItem'>) {
  const { items, categories, purchaseMethods } = useContext(AppData);
  const { params } = useRoute();
  const id = params?.id;
  const item = items[id];
  if (!id || !item) {
    return <Text>No item found</Text>;
  }

  const {
    manufacturerStatus,
    inStoreExtendedStatus,
    purchaseMethodExtendedStatus,
  } = getManufacturerWarrantyStatus(item, purchaseMethods[item.purchaseMethod]);

  const category = categories[item.category].label;
  const purchaseDate = new Date(item.purchaseDate).toLocaleDateString();
  const purchaseMethod = purchaseMethods[item.purchaseMethod]?.description;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 48, paddingHorizontal: 24 }}
    >
      <Text style={styles.title}>{item.description}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text>Make</Text>
          <Text>{item.make}</Text>
        </View>
        <View>
          <Text>Model</Text>
          <Text>{item.model}</Text>
        </View>
      </View>
      <Text>Serial Number</Text>
      <Text>{item.serial}</Text>

      {item.itemImageUri && (
        <View
          style={{
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: item.itemImageUri }}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      )}

      <View style={{ flexDirection: 'row' }}>
        <Text>Manufacturer Warranty</Text>
        <Text>{manufacturerStatus.isExpired}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 24 }}>
        <Text>Coverage Dates</Text>
        <Text>
          {manufacturerStatus.startDate} - {manufacturerStatus.endDate}
        </Text>
      </View>

      {inStoreExtendedStatus && (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text>In-Store Extended Warranty</Text>
            <Text>{inStoreExtendedStatus.isExpired}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 24 }}>
            <Text>Coverage Dates</Text>
            <Text>
              {inStoreExtendedStatus.startDate} -{' '}
              {inStoreExtendedStatus.endDate}
            </Text>
          </View>
        </>
      )}

      {purchaseMethodExtendedStatus && (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text>Purchase Method Extended Warranty</Text>
            <Text>{purchaseMethodExtendedStatus.isExpired}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 24 }}>
            <Text>Coverage Dates</Text>
            <Text>
              {purchaseMethodExtendedStatus.startDate} -
              {purchaseMethodExtendedStatus.endDate}
            </Text>
          </View>
        </>
      )}

      <View style={{ flexDirection: 'row' }}>
        <Text>Category</Text>
        <Text>{category}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>Purchase Date</Text>
        <Text>{purchaseDate}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>Purchase Method</Text>
        <Text>{purchaseMethod}</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {item.receiptImageUri && (
          <>
            <Text>Photo of Receipt</Text>
            <Image
              source={{ uri: item.receiptImageUri }}
              style={{ width: 150, height: 150 }}
            />
          </>
        )}
        {item.serialImageUri && (
          <>
            <Text>Photo of Serial Number</Text>
            <Image
              source={{ uri: item.serialImageUri }}
              style={{ width: 150, height: 150 }}
            />
          </>
        )}

        {item.warrantyImageUri && (
          <>
            <Text>Photo of Warranty</Text>
            <Image
              source={{ uri: item.warrantyImageUri }}
              style={{ width: 150, height: 150 }}
            />
          </>
        )}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={() => navigation.navigate('AddItem', { id })}
          style={{ backgroundColor: 'red', flex: 1, padding: 12, margin: 12 }}
        >
          <Text style={{ textAlign: 'center' }}>Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.replace('Home')}
          style={{ backgroundColor: 'green', flex: 1, padding: 12, margin: 12 }}
        >
          <Text style={{ textAlign: 'center' }}>Close</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
