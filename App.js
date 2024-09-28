import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { useTranslation } from './src/use-translation';
import Button from './src/Button';
import { useCookie } from './src/use-cookie';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const {locale, setLocale, t} = useTranslation();
  const {cookieKey} = useCookie();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (locale !== null && cookieKey !== "") { 
        setIsLoaded(true);
      }
  }, [locale, cookieKey]);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    };
  }, [isLoaded]);

  return (
    <View style={styles.container}>
      <Text>{t(cookieKey)}</Text>
      <View style={styles.buttonsContainer}>
        <Button 
          onPress={() => setLocale('ko')}
          isSelected={locale === 'ko'}
          text={'KO'} 
          />
        <Button 
          onPress={() => setLocale('en')}
          isSelected={locale === 'en'}
          text={'EN'} 
        />
        <Button 
          onPress={() => setLocale('ja')}
          isSelected={locale === 'ja'}
          text={'JA'} 
        />
        <Button 
          onPress={() => setLocale('zh')}
          isSelected={locale === 'zh'}
          text={'ZH'} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row'
  }
});