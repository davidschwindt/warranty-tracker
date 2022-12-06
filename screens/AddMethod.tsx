import { useContext, useState } from 'react';
import { StyleSheet, Pressable, Switch } from 'react-native';
import Dropdown from 'react-native-dropdown-picker';
import DurationInput from '../components/DurationInput';
import { Text, TextInput, View } from '../components/Themed';
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
    navigation.goBack();
  };

  const handleDelete = () => {
    deletePurchaseMethod(id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Purchase Method</Text>

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} />

      <Text>Last 4 Digits</Text>
      <TextInput
        value={lastFour}
        onChangeText={setLastFour}
        keyboardType="numeric"
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Purchase Protection/Security</Text>
        <Switch
          value={protectionEnabled}
          onValueChange={setProtectionEnabled}
        />
      </View>
      {protectionEnabled && (
        <>
          <Text>Duration</Text>
          <View style={{ zIndex: 10 }}>
            <DurationInput
              numUnits={protectionNumUnits}
              setNumUnits={setProtectionNumUnits}
              unit={protectionUnit}
              setUnit={setProtectionUnit}
            />
          </View>

          <Text>Protects Against</Text>
          <CheckboxList
            values={protectionThreats}
            onValuesChange={setProtectionThreats}
            options={[
              { label: 'Damage', value: Threat.damage },
              { label: 'Loss', value: Threat.loss },
              { label: 'Theft', value: Threat.theft },
            ]}
          />
          {limits.map((limit, i, array) => (
            <View style={{ zIndex: array.length - i }}>
              <LimitInput
                limit={limit}
                setLimit={(value) => updateLimit(i, value)}
              />
            </View>
          ))}
          <Pressable onPress={addLimit}>
            <Text>Add Limit</Text>
          </Pressable>
        </>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Extended Warranty/Protection</Text>
        <Switch value={extendedEnabled} onValueChange={setExtendedEnabled} />
      </View>
      {extendedEnabled && (
        <View style={{ paddingLeft: 12 }}>
          <View style={{ zIndex: 2 }}>
            <Text>Duration</Text>
            <DurationInput
              numUnits={extendedNumUnits}
              setNumUnits={setExtendedNumUnits}
              unit={extendedUnit}
              setUnit={setExtendedUnit}
            />
          </View>
          <Text>Coverage Begins</Text>
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

      <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: -1 }}>
        <Text>Return Protection</Text>
        <Switch value={returnEnabled} onValueChange={setReturnEnabled} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'grey', padding: 12, margin: 12, flex: 1 }}
        >
          <Text style={{ textAlign: 'center' }}>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={handleSave}
          style={{ backgroundColor: 'green', padding: 12, margin: 12, flex: 1 }}
        >
          <Text style={{ textAlign: 'center' }}>Save</Text>
        </Pressable>
      </View>
      {isEdit && (
        <Pressable
          onPress={handleDelete}
          style={{ backgroundColor: 'red', padding: 12, margin: 12 }}
        >
          <Text style={{ textAlign: 'center' }}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
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
