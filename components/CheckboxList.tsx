import Checkbox from 'expo-checkbox';
import { View, Text } from './Themed';

type Props = {
  options: { label: string; value: unknown }[];
  values: unknown[];
  onValuesChange: (value: any) => void;
};

const CheckboxList: React.FC<Props> = ({
  options,
  values,
  onValuesChange: setValues,
}) => {
  const toggleValue = (selectedValue: unknown) => {
    if (values.includes(selectedValue)) {
      setValues(values.filter((value) => value !== selectedValue));
    } else {
      setValues([...values, selectedValue]);
    }
  };

  return (
    <>
      {options.map(({ label, value: optionValue }) => (
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            value={values.includes(optionValue)}
            onValueChange={() => toggleValue(optionValue)}
          />
          <Text>{label}</Text>
        </View>
      ))}
    </>
  );
};

export default CheckboxList;
