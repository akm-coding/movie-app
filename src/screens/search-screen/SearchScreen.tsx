import {View, Text, StatusBar, FlatList, Dimensions} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {baseImagePath, searchMovies} from '../../api/apicalls';
import axios, {AxiosResponse} from 'axios';
import SubMovieCard from '../../components/submovie-card/SubMovieCard';
import InputHeader from '../../components/input-header/InputHeader';
import { SPACING } from '../../theme/theme';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name: string): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.get(searchMovies(name));
      const json = response.data;
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={searchList}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        bounces={false}
        ListHeaderComponent={
          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
          </View>
        }
        contentContainerStyle={styles.centerContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={false}
            shouldMarginatedAround={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 2 - SPACING.space_12 * 2}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </View>
  );
};

export default SearchScreen;
