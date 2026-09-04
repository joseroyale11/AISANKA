import {Platform} from 'react-native';

const SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  android: {
    elevation: 6,
  },
});

export default SHADOW;