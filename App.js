import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';

import { useTranslation } from './src/use-translation';
import Button from './src/Button';
import { useCookie } from './src/use-cookie';
import LoadingView from './src/LoadingView';

SplashScreen.preventAutoHideAsync();

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function App() {

  const {locale, setLocale, t, format} = useTranslation();
  const {cookieKey} = useCookie();

  const [isLoaded, setIsLoaded] = useState(false);

  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1; // 0 ~ 11
  const d = new Date().getDate();

  const todayText = format(t('today_is'), y, m, d);

  const locales = ["ko", "en", "ja", "zh", "es"];

  useEffect(() => {
    if (cookieKey !== "") { 
        setIsLoaded(true);
      }
  }, [cookieKey]);

  useEffect(() => {
    if (locale !== null) {
      SplashScreen.hideAsync();
    };
  }, [locale]);

  if (!isLoaded) return (
    <LoadingView />
  );

  return (
    <View style={styles.container}>
      <LottieView 
        autoPlay={true}
        source={require('./assets/background.json')}
        resizeMode='cover'
        style={{
          position: 'absolute',
          zIndex: -1,
          width,
          height
        }}
      />
      <SafeAreaView style={{flex:1}}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {locales.map( item => (
                <Button 
                key={item}
                onPress={() => setLocale(item)}
                isSelected={locale === item}
                text={item.toUpperCase()} 
                />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f",
  },
  cookieText: {
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: "center",
    marginBottom: 25,
  }
});