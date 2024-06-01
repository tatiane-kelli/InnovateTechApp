import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Loader = () => {
  const dotRefs = useRef([...Array(8)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = dotRefs.map((dotRef, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dotRef, {
            toValue: 1,
            duration: 450,
            delay: index * 112.5,
            useNativeDriver: true,
          }),
          Animated.timing(dotRef, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }),
        ])
      );
    });

    animations.forEach(animation => animation.start());
  }, []);

  const renderDots = () => {
    return dotRefs.map((dotRef, index) => {
      const rotate = index * 45;
      const scale = dotRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });
      const opacity = dotRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              transform: [{ rotate: `${rotate}deg` }, { scale }],
              opacity,
            },
          ]}
        >
          <View style={styles.dotInner} />
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.dotSpinner}>{renderDots()}</View>
      <Text style={styles.text}>Carregando mais...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotSpinner: {
    position: 'relative',
    height: 56,
    width: 56,
  },
  dot: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dotInner: {
    height: '20%',
    width: '20%',
    borderRadius: 50,
    backgroundColor: '#183153',
    shadowColor: '#121F35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#183153',
  },
});

export default Loader;
