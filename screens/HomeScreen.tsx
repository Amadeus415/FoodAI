import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const HomeScreen = () => {
  // Sample data for the weekly chart
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [2000, 1800, 2200, 1900, 2100, 2300, 2000] }],
  };

  // Sample data for calorie and macronutrient progress
  const calorieProgress = 1500;
  const calorieGoal = 2000;
  const carbProgress = 150;
  const carbGoal = 250;
  const fatProgress = 50;
  const fatGoal = 65;
  const proteinProgress = 100;
  const proteinGoal = 150;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/cherry.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Weekly Overview</Text>
          <LineChart
            data={weeklyData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />

          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <ProgressBar
            label="Calories"
            progress={calorieProgress}
            goal={calorieGoal}
            unit="kcal"
          />
          <ProgressBar
            label="Carbs"
            progress={carbProgress}
            goal={carbGoal}
            unit="g"
          />
          <ProgressBar
            label="Fat"
            progress={fatProgress}
            goal={fatGoal}
            unit="g"
          />
          <ProgressBar
            label="Protein"
            progress={proteinProgress}
            goal={proteinGoal}
            unit="g"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface ProgressBarProps {
  label: string;
  progress: number;
  goal: number;
  unit: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress, goal, unit }) => (
  <View style={styles.progressContainer}>
    <Text style={styles.progressLabel}>{label}</Text>
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressBar,
          { width: `${(progress / goal) * 100}%` },
        ]}
      />
    </View>
    <Text style={styles.progressText}>
      {progress} / {goal} {unit}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 150,
    height: 40,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  progressText: {
    marginTop: 5,
    textAlign: 'right',
  },
});

export default HomeScreen;
