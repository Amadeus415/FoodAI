import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SettingItemProps {
  icon: string;
  title: string;
  value?: boolean | string;
  onPress?: () => void;
  onValueChange?: (value: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, value, onPress, onValueChange }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Icon name={icon} size={24} color="#333" style={styles.settingIcon} />
    <Text style={styles.settingTitle}>{title}</Text>
    {typeof value === 'boolean' ? (
      <Switch value={value} onValueChange={onValueChange} />
    ) : (
      <Text style={styles.settingValue}>{value}</Text>
    )}
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <SettingItem
        icon="notifications-outline"
        title="Notifications"
        value={notifications}
        onValueChange={setNotifications}
      />
      <SettingItem
        icon="moon-outline"
        title="Dark Mode"
        value={darkMode}
        onValueChange={setDarkMode}
      />
      <SettingItem
        icon="person-outline"
        title="Account"
        value="Manage your account"
        onPress={() => {/* Navigate to Account screen */}}
      />
      <SettingItem
        icon="lock-closed-outline"
        title="Privacy"
        value="Manage your privacy settings"
        onPress={() => {/* Navigate to Privacy screen */}}
      />
      <SettingItem
        icon="help-circle-outline"
        title="Help & Support"
        value="Get assistance"
        onPress={() => {/* Navigate to Help screen */}}
      />
      <SettingItem
        icon="information-circle-outline"
        title="About"
        value="App version 1.0.0"
        onPress={() => {/* Show About info */}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
  },
  settingValue: {
    fontSize: 14,
    color: '#888',
  },
});

export default SettingsScreen;