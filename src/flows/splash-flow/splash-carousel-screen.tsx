import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/ui/layouts/screen-wrapper';
import AppText from '@/ui/atoms/text';
import Button from '@/ui/atoms/button';
import DotIndicator from '@/ui/molecules/dot-indicator';
import { SLIDES } from './splash-carousel-data';
import { styles } from './splash-carousel-screen-styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SplashCarouselScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const navigation = useNavigation<any>();

  const handleJoin = () => {
    navigation.navigate('SignupFlow');
  };

  const handleLogin = () => {
    navigation.navigate('AuthFlow');
  };

  const currentSlide = SLIDES[activeIndex];

  return (
    <ScreenWrapper backgroundColor={currentSlide.bg}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={item => item.id}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bg }]}>
            <View style={styles.imageContainer}>
              <item.Image width={SCREEN_WIDTH} height={377} />
            </View>
          </View>
        )}
      />

      <View style={styles.bottomCard}>
        <AppText variant="heading" style={styles.title}>
          {currentSlide.title}
        </AppText>

        <AppText variant="body" style={styles.description}>
          {currentSlide.description}
        </AppText>

        <View style={styles.dotsWrapper}>
          <DotIndicator count={SLIDES.length} activeIndex={activeIndex} />
        </View>

        <Button
          title="Join the movement!"
          backgroundColor={currentSlide.buttonBg}
          onPress={handleJoin}
          style={styles.joinButton}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.loginContainer}>
          <AppText style={styles.loginText}>Login</AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default SplashCarouselScreen;
