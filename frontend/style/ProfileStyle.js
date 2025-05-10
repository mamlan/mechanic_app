import { StyleSheet } from "react-native";
const ProfileStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    itemText: {
      fontSize: 16,
      flex: 1,
    },
    icon: {
      marginRight: 15,
      color: '#374151',
    },
    switch: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
  });

  export default ProfileStyle;