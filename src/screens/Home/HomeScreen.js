import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {COLORS} from '@components/styles/colors';
import {HomeThemeProvider} from './context/HomeThemeProvider';
import AppText from '../../components/AppText';
import MonthlyBonusCard from './components/MonthlyBonusCard';

export default function HomeScreen({navigation}) {
  const handleTabPress = index => {
    if (index === 2) {
      navigation.navigate('AccountStack');
    } else {
      setAnimateHighlight(true);
      setActiveTab(index);
    }
  };

  return (
    <HomeThemeProvider>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_padding}>
        <View style={styles.container}>
          <View style={styles.content}>
            <MonthlyBonusCard />
          </View>
        </View>
      </ScrollView>
    </HomeThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll_padding: {
    paddingBottom: 120,
  },
  home_card_section: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  home_card_section_logo: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  card_short_buttom_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card_short_buttom_group_btn: {
    paddingVertical: 13,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 90,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
