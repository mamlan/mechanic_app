import React, { useState } from 'react';
import ProfileStyle from '../../style/ProfileStyle.js'
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePress = (title) => {
    Alert.alert(title, `You pressed ${title}.`);
  };

  return (
    <ScrollView style={ProfileStyle.container}>
      <Text style={ProfileStyle.header}>Settings</Text>

      <TouchableOpacity style={ProfileStyle.item} onPress={() => handlePress('About')}>
        <Feather name="info" size={20} style={ProfileStyle.icon} />
        <Text style={ProfileStyle.itemText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ProfileStyle.item} onPress={() => handlePress('Terms and Services')}>
        <Feather name="file-text" size={20} style={ProfileStyle.icon} />
        <Text style={ProfileStyle.itemText}>Terms and Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ProfileStyle.item} onPress={() => handlePress('Send Feedback')}>
        <Feather name="message-square" size={20} style={ProfileStyle.icon} />
        <Text style={ProfileStyle.itemText}>Send Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ProfileStyle.item} onPress={() => handlePress('Check for Updates')}>
        <Feather name="refresh-cw" size={20} style={ProfileStyle.icon} />
        <Text style={ProfileStyle.itemText}>Check for Updates</Text>
      </TouchableOpacity>

      <View style={ProfileStyle.item}>
        <Feather name="moon" size={20} style={ProfileStyle.icon} />
        <Text style={ProfileStyle.itemText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={handleToggleMode} style={ProfileStyle.switch} />
      </View>

    </ScrollView>
  );
};


export default ProfileScreen;
