import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import RegularText from '../components/texts/RegularText';
import BoldText from '../components/texts/BoldText';
import FilterIcon from '../components/icons/FilterSearchIcon';
import SearchUserIcon from '../components/icons/SearchUserIcon';

const screenWidth = Dimensions.get('window').width;

export function Header({ onSearch, onFilterPress }) {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <BoldText style={styles.title}>
        InnovateTech
      </BoldText>
      <View style={styles.searchContainer}>
        <View style={styles.inputSearchWithIcon}>
          <SearchUserIcon style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar aluno..."
            placeholderTextColor="#415a77"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              onSearch(text);
            }}
          />
        </View>
        <TouchableOpacity onPress={onFilterPress}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 18,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    top: 18,
  },
  title: {
    fontSize: 24,
    color: '#0d1b2a',
    fontWeight: 'bold',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  inputSearchWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 45,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#CDD5E0',
    borderColor: '#778DA9',
    borderWidth: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: '#415a77',
  }
});

export default Header;
