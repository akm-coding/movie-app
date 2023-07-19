import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {COLORS, SPACING} from '../../theme/theme';

const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAtEnd
            ? props.isFirst
              ? {marginLeft: SPACING.space_36}
              : props.isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
            props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
            {maxWidth: props.cardWidth}
        ]}>
        <Image
          source={{uri: props.imagePath}}
          style={[styles.cardImage, {width: props.cardWidth}]}
        />
        <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;
