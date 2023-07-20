import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {SPACING} from '../../theme/theme';

const CastCard = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_24}
            : props.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
          {maxWidth: props.cardWidth},
      ]}>
      <Image source={{uri: props.imagePath}} style={[styles.cardImage, {width: props.cardWidth}]} />
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {props.subtitle}
      </Text>
    </View>
  );
};

export default CastCard;
