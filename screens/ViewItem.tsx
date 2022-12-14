import { StyleSheet, Pressable, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View, ScrollView, useThemeColor } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { useContext, useState } from 'react';
import { AppData } from '../data/Provider';
import Item, { ExtendedWarrantyStart } from '../types/Item';
import { Duration, DurationUnit } from '../types/Duration';
import PurchaseMethod from '../types/PurchaseMethod';
import WarrantyStatus from '../components/WarrantyStatus';
import ImageViewer from '../components/ImageViewer';

export type WarrantyStatus = {
  status: string;
  startDate: string;
  endDate: string;
};

const getWarrantyStatus = (
  startDateStr: Date,
  { numUnits, unit }: Duration
): WarrantyStatus => {
  const now = new Date();
  const startDate = new Date(startDateStr);
  let endDate = new Date(startDateStr);

  if (unit === DurationUnit.day) {
    endDate.setDate(endDate.getDate() + numUnits);
  } else if (unit === DurationUnit.month) {
    endDate.setMonth(endDate.getMonth() + numUnits);
  } else if (unit === DurationUnit.year) {
    endDate.setFullYear(endDate.getFullYear() + numUnits);
  }

  return {
    status: endDate < now ? 'EXPIRED' : now < startDate ? 'PENDING' : 'VALID',
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

const defaultText = 'N/A';

export default function ViewItem({
  navigation,
}: RootStackScreenProps<'View Item'>) {
  const color = useThemeColor({}, 'text');
  const [imageIndex, setImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
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

  const category = categories[item.category]?.label;
  const purchaseDate = new Date(item.purchaseDate).toLocaleDateString();
  const purchaseMethod = purchaseMethods[item.purchaseMethod];
  const purchaseMethodText = purchaseMethod
    ? `${purchaseMethod.description} ${
        purchaseMethod.lastFour ? `(${purchaseMethod.lastFour})` : ''
      }`
    : defaultText;
  const imageUris = [
    item.itemImageUri,
    item.receiptImageUri,
    item.serialImageUri,
    item.warrantyImageUri,
  ].filter((imageUri) => !!imageUri);

  const handleViewImage = (uri: string) => {
    const index = imageUris.findIndex((imageUri) => imageUri === uri);
    setImageIndex(index);
    setShowImageViewer(true);
  };
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: 24,
          paddingHorizontal: 24,
          paddingBottom: 48,
        }}
      >
        <Text style={styles.title}>{item.description || 'Untitled'}</Text>
        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
          <View style={{ width: '50%' }}>
            <Text style={styles.text}>Make</Text>
            <Text style={styles.thinText}>{item.make || defaultText}</Text>
          </View>
          <View>
            <Text style={styles.text}>Model</Text>
            <Text style={styles.thinText}>{item.model || defaultText}</Text>
          </View>
        </View>
        <View style={{ marginVertical: 8 }}>
          <Text style={styles.text}>Serial Number</Text>
          <Text style={styles.thinText}>{item.serial || defaultText}</Text>
        </View>

        {item.itemImageUri && (
          <Pressable
            onPress={() => handleViewImage(item.itemImageUri)}
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 8,
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
          </Pressable>
        )}

        <View style={{ marginVertical: 8 }}>
          <WarrantyStatus
            label={'Manufacturer Warranty'}
            status={manufacturerStatus}
          />
          {inStoreExtendedStatus && (
            <WarrantyStatus
              label={'In-Store Extended Warranty'}
              status={inStoreExtendedStatus}
            />
          )}
          {purchaseMethodExtendedStatus && (
            <WarrantyStatus
              label={'Purchase Method Extended Warranty'}
              status={purchaseMethodExtendedStatus}
            />
          )}
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: color,
            marginVertical: 8,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
          }}
        >
          <Text style={styles.text}>Category: </Text>
          <Text style={styles.boldText}>{category || defaultText}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
          }}
        >
          <Text style={styles.text}>Purchase Date: </Text>
          <Text style={styles.boldText}>{purchaseDate || defaultText}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
          }}
        >
          <Text style={styles.text}>Purchase Method: </Text>
          <Text style={styles.boldText}>
            {purchaseMethodText || defaultText}
          </Text>
        </View>

        <View
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            marginVertical: 8,
          }}
        >
          {item.receiptImageUri && (
            <View style={{ marginVertical: 8 }}>
              <Text style={styles.text}>Photo of Receipt</Text>
              <Pressable
                onPress={() => handleViewImage(item.receiptImageUri)}
                style={{
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 8,
                }}
              >
                <Image
                  source={{ uri: item.receiptImageUri }}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Pressable>
            </View>
          )}
          {item.serialImageUri && (
            <View style={{ marginVertical: 8 }}>
              <Text style={styles.text}>Photo of Serial Number</Text>
              <Pressable
                onPress={() => handleViewImage(item.serialImageUri)}
                style={{
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 8,
                }}
              >
                <Image
                  source={{ uri: item.serialImageUri }}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Pressable>
            </View>
          )}

          {item.warrantyImageUri && (
            <View style={{ marginVertical: 8 }}>
              <Text style={styles.text}>Photo of Warranty</Text>
              <Pressable
                onPress={() => handleViewImage(item.warrantyImageUri)}
                style={{
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 8,
                }}
              >
                <Image
                  source={{ uri: item.warrantyImageUri }}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Pressable>
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            onPress={() => navigation.navigate('Add Item', { id })}
            style={{ backgroundColor: 'red', flex: 1, padding: 12, margin: 12 }}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={{
              backgroundColor: 'green',
              flex: 1,
              padding: 12,
              margin: 12,
            }}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </ScrollView>
      {showImageViewer && (
        <ImageViewer
          imageUrls={imageUris}
          index={imageIndex}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontSize: 18,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flex: 1,
  },
  thinText: {
    fontSize: 18,
    fontWeight: '200',
    flexWrap: 'wrap',
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});
