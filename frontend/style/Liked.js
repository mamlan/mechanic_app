import { StyleSheet } from "react-native";
const LikedStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      elevation: 2, // Android shadow
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
    },
    address: {
      fontSize: 14,
      color: '#6B7280',
      marginTop: 3,
    },
  });

  export default LikedStyle;