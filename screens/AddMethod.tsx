import { useContext, useState } from 'react';
import { StyleSheet, Pressable, Switch } from 'react-native';
import Dropdown from 'react-native-dropdown-picker';
import DurationInput from '../components/DurationInput';
import { ScrollView, Text, TextInput, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import {
  ProtectionLimit,
  ProtectionLimitType,
  Threat,
} from '../types/PurchaseMethod';
import CheckboxList from '../components/CheckboxList';
import { DurationUnit } from '../types/Duration';
import LimitInput from '../components/LimitInput';
import { AppData } from '../data/Provider';
import { useRoute } from '@react-navigation/native';
import { ExtendedWarrantyStart } from '../types/Item';

export default function AddMethod({
  navigation,
}: RootStackScreenProps<'AddMethod'>) {
  const {
    purchaseMethods,
    addPurchaseMethod,
    editPurchaseMethod,
    deletePurchaseMethod,
  } = useContext(AppData);
  const { params } = useRoute();
  const id = params?.id;
  const method = purchaseMethods[id];
  const isEdit = !!method;

  const [description, setDescription] = useState(
    isEdit ? method.description : ''
  );
  const [lastFour, setLastFour] = useState(isEdit ? method.lastFour : '');
  const [protectionEnabled, setProtectionEnabled] = useState(
    isEdit ? !!method.purchaseProtection : false
  );
  const [protectionThreats, setProtectionThreats] = useState<Threat[]>(
    method?.purchaseProtection ? method.purchaseProtection.threats : []
  );
  const [protectionNumUnits, setProtectionNumUnits] = useState(
    method?.purchaseProtection
      ? method.purchaseProtection.duration.numUnits
      : 30
  );
  const [protectionUnit, setProtectionUnit] = useState(
    method?.purchaseProtection
      ? method.purchaseProtection.duration.unit
      : DurationUnit.day
  );
  const [limits, setLimits] = useState<ProtectionLimit[]>(
    method?.purchaseProtection
      ? method.purchaseProtection.limits
      : [{ amount: 0, type: ProtectionLimitType.account }]
  );
  const [extendedEnabled, setExtendedEnabled] = useState(
    isEdit ? !!method.extendedWarranty : false
  );
  const [extendedNumUnits, setExtendedNumUnits] = useState(
    method?.extendedWarranty ? method.extendedWarranty.duration.numUnits : 30
  );
  const [extendedUnit, setExtendedUnit] = useState(
    method?.extendedWarranty
      ? method.extendedWarranty.duration.unit
      : DurationUnit.day
  );
  const [extendedUnitOpen, setExtendedUnitOpen] = useState(false);
  const [extendedStart, setExtendedStart] = useState(
    method?.extendedWarranty
      ? method.extendedWarranty.startDate
      : ExtendedWarrantyStart.expirationDate
  );
  const [extendedStartOpen, setExtendedStartOpen] = useState(false);
  const [returnEnabled, setReturnEnabled] = useState(
    isEdit ? method.returnProtectionEnabled : false
  );

  const updateLimit = (index: number, value: ProtectionLimit) => {
    const newLimits = [...limits];
    newLimits.splice(index, 1, value);
    setLimits(newLimits);
  };

  const addLimit = () =>
    setLimits([...limits, { amount: 0, type: ProtectionLimitType.account }]);

  const removeLimit = (index: number) => {
    const newLimits = [...limits];
    newLimits.splice(index, 1);
    setLimits(newLimits);
  };

  const draftPurchaseMethod = {
    description,
    lastFour,
    purchaseProtection: protectionEnabled
      ? {
          threats: protectionThreats,
          duration: {
            numUnits: protectionNumUnits,
            unit: protectionUnit,
          },
          limits,
        }
      : undefined,
    extendedWarranty: extendedEnabled
      ? {
          duration: { numUnits: extendedNumUnits, unit: extendedUnit },
          startDate: extendedStart,
        }
      : undefined,
    returnProtectionEnabled: returnEnabled,
  };

  const handleSave = () => {
    if (isEdit) {
      editPurchaseMethod({ id, ...draftPurchaseMethod });
    } else {
      addPurchaseMethod(draftPurchaseMethod);
    }
    navigation.navigate('PurchaseMethods');
  };

  const handleDelete = () => {
    deletePurchaseMethod(id);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isEdit ? 'Edit' : 'Add'} Purchase Method
      </Text>

      <View style={{ marginVertical: 8 }}>
        <Text style={styles.label}>Description</Text>
        <TextInput value={description} onChangeText={setDescription} />
      </View>

      <View style={{ marginVertical: 8 }}>
        <Text style={styles.label}>Last 4 Digits</Text>
        <TextInput
          value={lastFour}
          onChangeText={setLastFour}
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Purchase Protection/Security</Text>
          <Switch
            value={protectionEnabled}
            onValueChange={setProtectionEnabled}
            style={{ marginLeft: 8 }}
          />
        </View>
      </View>
      {protectionEnabled && (
        <View style={{ marginLeft: 16 }}>
          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Duration</Text>
            <View style={{ zIndex: 10 }}>
              <DurationInput
                numUnits={protectionNumUnits}
                setNumUnits={setProtectionNumUnits}
                unit={protectionUnit}
                setUnit={setProtectionUnit}
              />
            </View>
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Protects Against</Text>
            <CheckboxList
              values={protectionThreats}
              onValuesChange={setProtectionThreats}
              options={[
                { label: 'Damage', value: Threat.damage },
                { label: 'Loss', value: Threat.loss },
                { label: 'Theft', value: Threat.theft },
              ]}
            />
          </View>
          {limits.map((limit, i, array) => {
            const isLast = i === array.length - 1;
            return (
              <View
                style={{
                  zIndex: array.length - i,
                  marginVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <LimitInput
                  limit={limit}
                  setLimit={(value) => updateLimit(i, value)}
                />
                <Pressable
                  onPress={isLast ? addLimit : () => removeLimit(i)}
                  style={{
                    backgroundColor: isLast ? 'green' : 'red',
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 16,
                    marginLeft: 8,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      lineHeight: 26,
                      fontSize: 24,
                    }}
                  >
                    {isLast ? '+' : '-'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
          zIndex: -1,
        }}
      >
        <Text style={styles.label}>Extended Warranty/Protection</Text>
        <Switch
          value={extendedEnabled}
          onValueChange={setExtendedEnabled}
          style={{ marginLeft: 8 }}
        />
      </View>
      {extendedEnabled && (
        <View
          style={{
            paddingLeft: 16,
            marginBottom: 8,
            zIndex: extendedUnitOpen ? 1000 : -1,
          }}
        >
          <View style={{ zIndex: 2, marginBottom: 8 }}>
            <Text style={styles.label}>Duration</Text>
            <DurationInput
              numUnits={extendedNumUnits}
              setNumUnits={setExtendedNumUnits}
              unit={extendedUnit}
              setUnit={setExtendedUnit}
              onChangeOpen={setExtendedUnitOpen}
            />
          </View>
          <Text style={styles.label}>Coverage Begins</Text>
          <View style={{ zIndex: extendedStartOpen ? 3 : 1 }}>
            <Dropdown
              open={extendedStartOpen}
              setOpen={setExtendedStartOpen}
              value={extendedStart}
              setValue={setExtendedStart}
              items={[
                {
                  value: ExtendedWarrantyStart.purchaseDate,
                  label: 'Purchase Date',
                },
                {
                  value: ExtendedWarrantyStart.expirationDate,
                  label: "Expiration of Manufacturer's Warranty",
                },
              ]}
            />
          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: -2,
          marginVertical: 8,
        }}
      >
        <Text style={styles.label}>Return Protection</Text>
        <Switch
          value={returnEnabled}
          onValueChange={setReturnEnabled}
          style={{ marginLeft: 8 }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: -2,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'grey', padding: 12, margin: 12, flex: 1 }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={handleSave}
          style={{ backgroundColor: 'green', padding: 12, margin: 12, flex: 1 }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
      {isEdit && (
        <Pressable
          onPress={handleDelete}
          style={{ backgroundColor: 'red', padding: 12, margin: 12 }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 24,
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
  label: {
    fontSize: 20,
    marginBottom: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});
