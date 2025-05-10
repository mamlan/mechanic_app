import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ForumScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Best mechanic for engine repairs?',
      content: 'Looking for a reliable shop in Brooklyn that specializes in engine issues. Any suggestions?',
      comments: ['Try Joe’s Auto!', 'I had a good experience at Speedy Motors.'],
      timestamp: Date.now() - 100000,
    },
    {
      id: '2',
      title: 'Affordable tire replacement?',
      content: 'Need to replace all four tires. Any shops that won’t break the bank?',
      comments: ['Tire King is pretty cheap!', 'Check Groupon too.'],
      timestamp: Date.now() - 500000,
    },
    {
      id: '3',
      title: 'How long does an oil change usually take?',
      content: 'First-time car owner here. Wondering how long I should expect to wait.',
      comments: ['Usually 30 minutes!', 'Depends on how busy they are.'],
      timestamp: Date.now() - 900000,
    },
  ]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [sortMode, setSortMode] = useState('recent');
  const [isPosting, setIsPosting] = useState(false);
  const [commentTexts, setCommentTexts] = useState({}); // 🆕 One global state for comments

  const addPost = () => {
    if (newPostTitle.trim() === '' || newPostContent.trim() === '') {
      Alert.alert('Error', 'Please enter both a title and content.');
      return;
    }
    const newPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      comments: [],
      timestamp: Date.now(),
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setIsPosting(false);
  };

  const addComment = (postId, commentText) => {
    if (commentText.trim() === '') return;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, commentText],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortMode === 'recent') {
      return b.timestamp - a.timestamp;
    } else {
      return b.comments.length - a.comments.length;
    }
  });

  const renderPost = ({ item }) => {
    const commentText = commentTexts[item.id] || '';

    return (
      <View style={styles.postCard}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
        <Text style={styles.commentCount}>{item.comments.length} Comments</Text>

        {/* Show comments */}
        {item.comments.map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Feather name="message-square" size={14} color="#6B7280" />
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        ))}

        {/* Add Comment */}
        <View style={styles.commentInputContainer}>
          <TextInput
            placeholder="Add a comment..."
            style={styles.commentInput}
            value={commentText}
            onChangeText={(text) => 
              setCommentTexts(prev => ({ ...prev, [item.id]: text }))
            }
          />
          <TouchableOpacity onPress={() => {
            addComment(item.id, commentText);
            setCommentTexts(prev => ({ ...prev, [item.id]: '' })); // Clear comment box
          }}>
            <Feather name="send" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forum</Text>

      {!isPosting ? (
        <TouchableOpacity style={styles.newPostButton} onPress={() => setIsPosting(true)}>
          <Text style={styles.newPostButtonText}>New Post ✍️</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.newPostContainer}>
          <TextInput
            placeholder="Post Title"
            value={newPostTitle}
            onChangeText={setNewPostTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="What's on your mind?"
            value={newPostContent}
            onChangeText={setNewPostContent}
            style={[styles.input, { height: 80 }]}
            multiline
          />
          <TouchableOpacity style={styles.postButton} onPress={addPost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsPosting(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sort Buttons */}
      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => setSortMode('recent')}>
          <Text style={[styles.sortText, sortMode === 'recent' && styles.activeSort]}>
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortMode('popular')}>
          <Text style={[styles.sortText, sortMode === 'popular' && styles.activeSort]}>
            Popular
          </Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  newPostButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  newPostButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  newPostContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  sortText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  activeSort: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 10,
  },
  commentCount: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#6B7280',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    height: 35,
  },
});

export default ForumScreen;
