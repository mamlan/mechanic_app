const ShopsScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FAFB',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 15,
      paddingHorizontal: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      height: 50,
      fontSize: 16,
    },
    filterButton: {
      padding: 10,
    },
    listContainer: {
      padding: 15,
      paddingTop: 5,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#6B7280',
    },
    errorText: {
      marginTop: 10,
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#2563EB',
      borderRadius: 8,
    },
    retryButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      marginTop: 10,
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
    },
  });
  export default ShopsScreenStyle;