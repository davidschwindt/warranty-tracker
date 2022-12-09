import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';

const WarrantyStatus = ({
  label,
  status: { isExpired, startDate, endDate },
}) => {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={styles.text}>{label}: </Text>
        <Text
          style={[
            styles.boldText,
            {
              color: isExpired === 'EXPIRED' ? 'red' : 'green',
            },
          ]}
        >
          {isExpired}
        </Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 24 }}
      >
        <Text style={styles.text}>Coverage Dates: </Text>
        <Text
          style={[
            styles.boldText,
            {
              color: isExpired === 'EXPIRED' ? 'red' : 'green',
            },
          ]}
        >
          {startDate} - {endDate}
        </Text>
      </View>
    </>
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
  },
});
