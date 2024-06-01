import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RegularText from './texts/RegularText';
import BoldText from './texts/BoldText';
import translateGender from '../utils/translateGender';
import formatDate from '../utils/formatDate';

const StudentCard = ({ student, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: student.picture.thumbnail }} style={styles.image} />
      <View style={styles.infoContainer}>
        <BoldText style={styles.name}>{`${student.name.first} ${student.name.last}`}</BoldText>
        <View style={styles.details}>
          <RegularText style={styles.detailText}>
            {translateGender(student.gender)}
          </RegularText>
          <RegularText style={styles.detailText}>{formatDate(student.dob.date)}</RegularText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#F3F6FC',
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center'
  },
  name: {
    fontSize: 18,
    marginBottom: 5
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailText: {
    fontSize: 14,
    marginRight: 10
  }
});

export default StudentCard;
