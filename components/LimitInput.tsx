import Dropdown from 'react-native-dropdown-picker';
import { TextInput, View, Text } from './Themed';
import { durationLabels, DurationUnit } from '../types/Duration';
import { useEffect, useState } from 'react';
import { ProtectionLimit, ProtectionLimitType } from '../types/PurchaseMethod';

type Props = {
  limit: ProtectionLimit;
  setLimit: (limit: ProtectionLimit) => void;
};

const LimitInput: React.FC<Props> = ({ limit: { amount, type }, setLimit }) => {
  const [open, setOpen] = useState(false);
  const [innerType, setInnerType] = useState(ProtectionLimitType.account);

  const handleAmountChange = (value: string) => {
    if (!value) {
      setLimit({ amount: 0, type });
    } else if (Number.isNaN(value)) {
      // do nothing
    } else {
      setLimit({ amount: Number.parseInt(value), type });
    }
  };

  useEffect(() => {
    setLimit({ amount, type: innerType });
  }, [innerType]);

  return (
    <View
      style={{
        flexDirection: 'row',
        zIndex: 1,
        alignItems: 'center',
      }}
    >
      <Text>$ </Text>
      <TextInput
        keyboardType="numeric"
        value={amount ? amount.toString() : ''}
        onChangeText={handleAmountChange}
        style={{ minWidth: 100 }}
      />
      <Text> per </Text>
      <Dropdown
        open={open}
        setOpen={setOpen}
        value={type}
        setValue={setInnerType}
        items={[
          {
            value: ProtectionLimitType.account,
            label: 'Account',
          },
          {
            value: ProtectionLimitType.card,
            label: 'Card',
          },
          {
            value: ProtectionLimitType.claim,
            label: 'Claim',
          },
          {
            value: ProtectionLimitType.person,
            label: 'Person',
          },
        ]}
        containerStyle={{ width: 125 }}
      />
    </View>
  );
};

export default LimitInput;
