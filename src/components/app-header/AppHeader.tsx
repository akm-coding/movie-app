import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomIcon from '../icons/CustomIcon';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
        <CustomIcon name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

export default AppHeader;
