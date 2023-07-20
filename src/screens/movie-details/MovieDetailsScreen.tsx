import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import axios, {AxiosResponse} from 'axios';
import {
  movieDetails,
  movieCastDetails,
  baseImagePath,
} from '../../api/apicalls';
import {COLORS} from '../../theme/theme';
import AppHeader from '../../components/app-header/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../components/icons/CustomIcon';
import CategoryHeader from '../../components/category-header/CategoryHeader';
import CastCard from '../../components/cast-card/CastCard';

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
    const response: AxiosResponse = await axios.get(movieCastDetails(movieid));
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
      const tempMovieData: any = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();
    (async () => {
      const tempMovieCastData: any = await getMovieCastDetails(
        route.params.movieid,
      );
      setMovieCastData(tempMovieCastData.cast);
    })();
  }, []);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <AppHeader
            name="close"
            header={'Movie Details'}
            action={() => navigation.goBack()}
          />
        </View>
        <View>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      // contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={movieData?.original_title}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: baseImagePath('w342', movieData?.poster_path)}}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>
      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>
      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList
          data={movieCastData}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <CastCard
              shouldMarginatedAtEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
              imagePath={baseImagePath('w185', item.profile_path)}
              title={item.original_name}
              subtitle={item.character}
            />
          )}
        />
        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.push('SeatBooking', {
                BgImage: baseImagePath('w780', movieData.backdrop_path),
                PosterImage: baseImagePath('original', movieData.poster_path),
              });
            }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
