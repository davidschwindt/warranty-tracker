import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';
import { WarrantyStatus as Status } from '../screens/ViewItem';

type WarrantyStatusProps = {
  label: string;
  status: Status;
};

const WarrantyStatus: React.FC<WarrantyStatusProps> = ({
  label,
  status: { status, startDate, endDate },
}) => {
  const color =
    status === 'EXPIRED' ? 'red' : status === 'PENDING' ? 'orange' : 'green';
  return (
    <View style={{ marginVertical: 4 }}>
      <Text style={styles.text}>{label}: </Text>
      <View style={{ paddingLeft: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.text}>Status: </Text>
          <Text style={[styles.boldText, { color }]}>{status}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={styles.text}>Covers: </Text>
          <Text style={[styles.boldText, { color }]}>
            {startDate} - {endDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WarrantyStatus;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flex: 1,
  },
});
