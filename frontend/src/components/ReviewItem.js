import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ReviewItem = ({ review }) => {
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= review.rating) {
        stars.push(
          <Feather key={i} name="star" size={14} color="#F59E0B" style={styles.starIcon} />
        );
      } else {
        stars.push(
          <Feather key={i} name="star" size={14} color="#E5E7EB" style={styles.starIcon} />
        );
      }
    }
    return stars;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{review.userName}</Text>
          <View style={styles.starsContainer}>
            {renderStars()}
            <Text style={styles.date}>{formatDate(review.date)}</Text>
          </View>
        </View>
        {review.source && (
          <View style={styles.sourceTag}>
            <Text style={styles.sourceText}>{review.source}</Text>
          </View>
        )}
      </View>
      <Text style={styles.content}>{review.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
  },
  date: {
    marginLeft: 8,
    color: '#6B7280',
    fontSize: 12,
  },
  sourceTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  sourceText: {
    fontSize: 12,
    color: '#4B5563',
  },
  content: {
    color: '#1F2937',
    lineHeight: 20,
  },
});

export default ReviewItem;
