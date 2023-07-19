import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../icons/CustomIcon';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => setSearchText(textInput)}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={searchText}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <CustomIcon
          name="search"
          color={COLORS.Orange}
          size={FONTSIZE.size_20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;
