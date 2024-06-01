import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Modal, Text, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentCard from '../components/StudentCard';
import Header from '../components/Header';
import Loader from '../components/Loader';
import RegularText from '../components/texts/RegularText';
import ReturnArrowIcon from '../components/icons/ReturnArrowIcon';

import translateGender from '../utils/translateGender';
import formatDate from '../utils/formatDate';

const Home = () => {
  const [searchStudent, setSearchStudent] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [genderFilter, setGenderFilter] = useState(0);

  const listStudents = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      let moreStudents = [];
      if (page === 1) {
        const cachedData = await AsyncStorage.getItem('students');
        if (cachedData) {
          moreStudents = JSON.parse(cachedData);
          setStudents(moreStudents);
          setFilteredStudents(moreStudents);
          setLoading(false);
          return;
        }
      }
      const response = await axios.get(`https://randomuser.me/api/?results=20&page=${page}`);
      moreStudents = page === 1 ? response.data.results : [...students, ...response.data.results];

      setStudents(moreStudents);
      setFilteredStudents(moreStudents);

      if (page === 1) {
        AsyncStorage.setItem('students', JSON.stringify(moreStudents));
      }
    } catch (error) {
      console.error('Houve um erro ao carregar os estudantes', error);
    }

    setLoading(false);
  }, [page, loading, students]);

  useEffect(() => {
    listStudents();
  }, [listStudents]);

  const handleSearch = useCallback((value) => {
    setSearchStudent(value);
    filterStudents(value, genderFilter);
  }, [students, genderFilter]);

  const filterStudents = useCallback((searchText, gender) => {
    let filtered = students;

    if (searchText) {
      filtered = filtered.filter(student =>
        student.name.first.toLowerCase().startsWith(searchText.toLowerCase()) ||
        student.name.last.toLowerCase().startsWith(searchText.toLowerCase())
      );
    }

    if (gender === 1) {
      filtered = filtered.filter(student => student.gender === 'male');
    } else if (gender === 2) {
      filtered = filtered.filter(student => student.gender === 'female');
    }

    setFilteredStudents(filtered);
  }, [students]);

  const handleFilterPress = useCallback(() => {
    setGenderFilter(prev => (prev + 1) % 3);
  }, []);

  useEffect(() => {
    filterStudents(searchStudent, genderFilter);
  }, [genderFilter, searchStudent, filterStudents]);

  function handleOpenModal(student) {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  function getListedGenderText() {
    if (genderFilter === 1) {
      return 'Listando alunos do gênero masculino';
    } else if (genderFilter === 2) {
      return 'Listando alunos do gênero feminino';
    }
    return;
  };

  return (
    <View style={styles.container}>
      <Header 
        onSearch={handleSearch}
        onFilterPress={handleFilterPress}
      />
      <RegularText style={styles.listedGenderText}>
        {getListedGenderText()}
      </RegularText>
      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.login.uuid}
        renderItem={({ item }) => (
          <StudentCard student={item} onPress={() => handleOpenModal(item)} />
        )}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Loader /> : null}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedStudent && (
              <>
                <Image source={{ uri: selectedStudent.picture.large }} style={styles.image} />
                <View style={styles.modalStudentDetails}>
                  <RegularText style={styles.modalStudentInfo}>
                    {`Nome: ${selectedStudent.name.first} ${selectedStudent.name.last}`}
                  </RegularText>
                  <RegularText style={styles.modalStudentInfo}>{`Email: ${selectedStudent.email}`}</RegularText>
                  <RegularText style={styles.modalStudentInfo}>{`Gênero: ${translateGender(selectedStudent.gender)}`}</RegularText>
                  <RegularText style={styles.modalStudentInfo}>
                    {`Data de Nascimento: ${formatDate(selectedStudent.dob.date)}`}
                  </RegularText>
                  <RegularText style={styles.modalStudentInfo}>{`Telefone: ${selectedStudent.phone}`}</RegularText>
                  <RegularText style={styles.modalStudentInfo}>{`Nacionalidade: ${selectedStudent.nat}`}</RegularText>
                  <RegularText style={styles.modalStudentInfo}>
                    {`Endereço: ${selectedStudent.location.street.name}, ${selectedStudent.location.city}, ${selectedStudent.location.state}, ${selectedStudent.location.country}`}
                  </RegularText>
                  <RegularText style={styles.modalStudentInfo}>{`ID: ${selectedStudent.id.value}`}</RegularText>
                </View>
                <TouchableOpacity style={styles.buttonCloseModal} onPress={handleCloseModal}>
                  <ReturnArrowIcon />
                  <RegularText style={styles.buttonCloseModalText}>Voltar para a lista</RegularText>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ECF2F8',
  },
  listedGenderText: {
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: -16,
    color: '#778DA9',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 25, 0.6)',
  },
  modalContainer: {
    width: '100%',
    height: '80%',
    marginTop: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    zIndex: 3,
    marginTop: -100,
  },
  modalStudentDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  modalStudentInfo: {
    fontSize: 18,
    lineHeight: 32,
    color: '#0A0A0A',
  },
  buttonCloseModal: {
    backgroundColor: '#778DA9',
    borderRadius: 110,
    width: 250,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
  },
  buttonCloseModalText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#F5F5F4',
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

export default Home;
