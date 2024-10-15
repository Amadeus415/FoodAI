import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';

// TODO: Import and initialize Firebase here if needed
// import { initializeApp } from 'firebase/app';
// const firebaseConfig = { ... };
// const app = initializeApp(firebaseConfig);

type TabName = 'Home' | 'Analytics' | 'Camera' | 'Settings';

interface TabButtonProps {
  name: TabName;
  icon: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ name, icon, isActive, onPress }) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    <Icon
      name={icon}
      size={24}
      color={isActive ? '#3498db' : '#7f8c8d'}
    />
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>{name}</Text>
  </TouchableOpacity>
);

const TabContent: React.FC<{ name: TabName }> = ({ name }) => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>{name} Screen</Text>
  </View>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Analytics':
        return <TabContent name="Analytics" />;
      case 'Camera':
        return <TabContent name="Camera" />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderTabContent()}
      <View style={styles.tabBar}>
        <TabButton
          name="Home"
          icon="home-outline"
          isActive={activeTab === 'Home'}
          onPress={() => setActiveTab('Home')}
        />
        <TabButton
          name="Analytics"
          icon="bar-chart-outline"
          isActive={activeTab === 'Analytics'}
          onPress={() => setActiveTab('Analytics')}
        />
        <TabButton
          name="Camera"
          icon="camera-outline"
          isActive={activeTab === 'Camera'}
          onPress={() => setActiveTab('Camera')}
        />
        <TabButton
          name="Settings"
          icon="settings-outline"
          isActive={activeTab === 'Settings'}
          onPress={() => setActiveTab('Settings')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#7f8c8d',
  },
  activeTabText: {
    color: '#3498db',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContentText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
