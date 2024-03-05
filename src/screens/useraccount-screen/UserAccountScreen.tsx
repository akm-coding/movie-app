import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import AppHeader from '../../components/app-header/AppHeader';
import SettingsComponent from '../../components/settings-component/SettingsComponent';

const UserAccountScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Profile'}
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.avatarImage}
          source={require('../../assets/images/avatar.png')}
        />
        <Text style={styles.avatarText}>John Doe</Text>
      </View>
      <View style={styles.profileContainer}>
        <SettingsComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile Detail"
          subtitle="Change Password"
        />
        <SettingsComponent
          icon="setting"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <SettingsComponent
          icon="dollar"
          heading="Offers & Refferals"
          subheading="Offer"
          subtitle="Refferals"
        />
        <SettingsComponent
          icon="info"
          heading="About"
          subheading="About Movies"
          subtitle="More"
        />
      </View>
    </View>
  );
};

export default UserAccountScreen;
