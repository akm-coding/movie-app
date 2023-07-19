import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import axios, {AxiosResponse} from 'axios';
import {movieDetails, moviecastDetails} from '../../api/apicalls';

const getMovieDetails = async (movieid: number): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(movieDetails(movieid));
    return response.data;
  } catch (error) {
    console.error('Something went wrong in getMovieDetails Function', error);
    throw error;
  }
};

const getMovieCastDetails = async (movieid: number): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(moviecastDetails(movieid));
    return response.data;
  } catch (error) {
    console.error(
      'Something went wrong in getMovieCastDetails Function',
      error,
    );
    throw error;
  }
};

const MovieDetailsScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();
    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text>MovieDetailsScreen</Text>
    </View>
  );
};

export default MovieDetailsScreen;
