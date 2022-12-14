/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LineChart} from 'react-native-chart-kit';
import {useDataFetcher} from './networking/dataFetcher';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // TODO: Unfortunatelly didn't have time to implement loading view
  const {lineChartData, loading} = useDataFetcher();

  const {width, height} = useWindowDimensions();

  const chartConfig = {
    backgroundGradientFrom: backgroundStyle.backgroundColor,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: backgroundStyle.backgroundColor,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={[backgroundStyle, styles.container]}>
        {loading && !lineChartData && <ActivityIndicator size={'large'} />}
        {lineChartData && !loading && (
          <LineChart
            data={lineChartData}
            width={width}
            height={height}
            chartConfig={chartConfig}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
