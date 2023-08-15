import React, {useEffect, useState} from 'react';
import {Text, View, StatusBar, ImageBackground, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../../components/app-header/AppHeader';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../components/icons/CustomIcon';
import {COLORS} from '../../theme/theme';

const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Tickets'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.subtitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray
                  .slice(0, 3)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../assets/images/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  );
};

export default TicketScreen;
