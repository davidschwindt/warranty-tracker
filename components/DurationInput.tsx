import Dropdown from 'react-native-dropdown-picker';
import { TextInput, View } from './Themed';
import { durationLabels, DurationUnit } from '../types/Duration';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  numUnits?: number;
  setNumUnits: Dispatch<SetStateAction<number>>;
  unit: DurationUnit;
  setUnit: Dispatch<SetStateAction<DurationUnit>>;
};

const DurationInput: React.FC<Props> = ({
  numUnits,
  setNumUnits,
  unit,
  setUnit,
}) => {
  const [open, setOpen] = useState(false);

  const handleTextChange = (value: string) => {
    if (!value) {
      setNumUnits(0);
    } else if (Number.isNaN(value)) {
      // do nothing
    } else {
      setNumUnits(Number.parseInt(value));
    }
  };

  return (
    <View style={{ flexDirection: 'row', zIndex: 1 }}>
      <TextInput
        keyboardType="numeric"
        value={numUnits ? numUnits.toString() : ''}
        onChangeText={handleTextChange}
      />
      <Dropdown
        open={open}
        setOpen={setOpen}
        value={unit}
        setValue={setUnit}
        items={Object.entries(durationLabels).map(([value, label]) => ({
          value,
          label,
        }))}
      />
    </View>
  );
};

export default DurationInput;
