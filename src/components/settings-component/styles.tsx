import {StyleSheet} from 'react-native';
import {SPACING, COLORS, FONTSIZE, FONTFAMILY} from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_10,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_10,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA15,
  },
});

export default styles;
