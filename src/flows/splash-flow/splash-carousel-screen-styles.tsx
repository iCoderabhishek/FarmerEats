import { Colors, Fonts } from '@/core/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  slide: {
    width: SCREEN_WIDTH,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 423,
    justifyContent: 'flex-end',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 422,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    marginTop: 31,
    fontFamily: Fonts.bold,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
  },
  description: {
    marginTop: 40,
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark,
    textAlign: 'center',
  },
  dotsWrapper: {
    marginTop: 27,
  },
  joinButton: {
    marginTop: 60,
    width: 236,
    height: 60,
    alignSelf: 'center',
  },
  loginContainer: {
    marginTop: 16,
  },
  loginText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.dark,
    textDecorationLine: 'underline',
  },
});
