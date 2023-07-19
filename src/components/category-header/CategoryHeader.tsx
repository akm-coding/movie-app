import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'

const CategoryHeader = (props: any) => {
  return (
    <Text style={styles.text}>{props.title}</Text>
  )
}

export default CategoryHeader