import React, {useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';

import WorldCard from './WorldCard';

const {width} = Dimensions.get('window');

const worlds = [
  {
    id: 1,
    title: 'Explorando mi entorno',
    image: require('../../assets/images/mundo1.png'),
    unlocked: true,
    progress: 0,
  },
  {
    id: 2,
    title: 'Mi comunidad',
    image: require('../../assets/images/mundo2.png'),
    unlocked: false,
    progress: 0,
  },
  {
    id: 3,
    title: 'Descubriendo Nicaragua',
    image: require('../../assets/images/mundo3.png'),
    unlocked: false,
    progress: 0,
  },
];

interface Props {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function WorldCarousel({
  currentIndex,
  setCurrentIndex,
}: Props) {
  const flatListRef = useRef<FlatList>(null);

  function siguiente() {
    if (currentIndex >= worlds.length - 1) {
      return;
    }

    const nuevo = currentIndex + 1;

    flatListRef.current?.scrollToIndex({
      index: nuevo,
      animated: true,
    });

    setCurrentIndex(nuevo);
  }

  function anterior() {
    if (currentIndex <= 0) {
      return;
    }

    const nuevo = currentIndex - 1;

    flatListRef.current?.scrollToIndex({
      index: nuevo,
      animated: true,
    });

    setCurrentIndex(nuevo);
  }

  return (
    <View style={styles.container}>
  
      <TouchableOpacity
        style={[
          styles.arrow,
          styles.leftArrow,
          currentIndex === 0 && styles.disabled,
        ]}
        onPress={anterior}
        activeOpacity={0.8}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={42}
          color="#555"
        />
      </TouchableOpacity>

   
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={worlds}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={{width}}>
            <WorldCard world={item} />
          </View>
        )}
        onMomentumScrollEnd={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width,
          );

          setCurrentIndex(index);
        }}
      />

      <TouchableOpacity
        style={[
          styles.arrow,
          styles.rightArrow,
          currentIndex === worlds.length - 1 && styles.disabled,
        ]}
        onPress={siguiente}
        activeOpacity={0.8}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={42}
          color="#555"
        />
      </TouchableOpacity>

      <View style={styles.indicators}>
        {worlds.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  arrow: {
    position: 'absolute',
    top: '40%',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 100,
  },

  leftArrow: {
    left: 10,
  },

  rightArrow: {
    right: 10,
  },

  disabled: {
    opacity: 0.3,
  },

  indicators: {
    flexDirection: 'row',
    marginTop: 15,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#DDD',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 26,
    backgroundColor: '#5EC8B2',
  },
});