import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';

export interface SocialPost {
  id: string;
  author: string;
  avatarText: string;
  tripName: string;
  timeAgo: string;
  location: string;
  caption: string;
  imageUri: string;
  likes: number;
  isLiked: boolean;
  commentsCount: number;
}

export default function MemoriesTabScreen() {
  const { colors } = useAppTheme();

  const [newPostCaption, setNewPostCaption] = useState('');
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      author: 'Arun Kumar',
      avatarText: 'A',
      tripName: 'Athirapally Gateway',
      timeAgo: '2 hours ago',
      location: 'Athirapally Waterfalls, Kerala',
      caption: 'Stunning waterfall view after a morning hike with the whole group! Rainbow visible near the lower falls. 🌊🌈 #TravelDiaries #WaterfallMagic',
      imageUri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      likes: 24,
      isLiked: false,
      commentsCount: 5,
    },
    {
      id: '2',
      author: 'Thiru Arasu',
      avatarText: 'T',
      tripName: 'Valparai Hills Drive',
      timeAgo: 'Yesterday at 5:30 PM',
      location: 'Valparai Tea Gardens Viewpoint',
      caption: 'Golden hour sunset over tea estate mountain curves. Unforgettable hill road drive with the crew! 🌄🚗 #ValparaiRoadtrip #TeaGardens',
      imageUri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      likes: 42,
      isLiked: true,
      commentsCount: 12,
    },
    {
      id: '3',
      author: 'Kavya Sharma',
      avatarText: 'K',
      tripName: 'Coorg Coffee & Camping',
      timeAgo: '3 days ago',
      location: 'Mandalpatti Peak, Coorg',
      caption: '360-degree hilltop mist and morning camp coffee! Best weekend getaway. ☕⛰️ #CoorgMist #CampVibes',
      imageUri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
      likes: 19,
      isLiked: false,
      commentsCount: 3,
    },
  ]);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likes: nextLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleSharePost = async (post: SocialPost) => {
    try {
      await Share.share({
        message: `Check out ${post.author}'s trip memory from ${post.tripName} on SAFNORA: "${post.caption}"`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCreatePost = () => {
    if (!newPostCaption.trim()) return;
    const newPostItem: SocialPost = {
      id: Date.now().toString(),
      author: 'Thiru Arasu (You)',
      avatarText: 'T',
      tripName: 'Valparai Gateway Adventure',
      timeAgo: 'Just now',
      location: 'Valparai, Kerala',
      caption: newPostCaption.trim(),
      imageUri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      likes: 1,
      isLiked: true,
      commentsCount: 0,
    };
    setPosts([newPostItem, ...posts]);
    setNewPostCaption('');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Travel Feed & Memories</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Social journey feed — Like, comment & share trip moments
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Create Post Prompt Card */}
        <View style={[styles.createPostCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.createPostTopRow}>
            <View style={styles.userAvatarCircle}>
              <Text style={styles.userAvatarText}>T</Text>
            </View>
            <TextInput
              style={[styles.createPostInput, { color: colors.text, backgroundColor: colors.surfaceSubtle }]}
              placeholder="Share a memory or trip story..."
              placeholderTextColor={colors.textMuted}
              value={newPostCaption}
              onChangeText={setNewPostCaption}
              multiline
            />
          </View>

          <View style={[styles.createPostActionRow, { borderTopColor: colors.border }]}>
            <TouchableOpacity style={styles.photoAttachButton} onPress={handleCreatePost} activeOpacity={0.8}>
              <Feather name="image" size={18} color="#00A896" style={{ marginRight: 6 }} />
              <Text style={styles.photoAttachText}>Add Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postSubmitButton} onPress={handleCreatePost} activeOpacity={0.85}>
              <Feather name="send" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.postSubmitText}>Share Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media Event Feed List */}
        {posts.map((post) => (
          <View key={post.id} style={[styles.postCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorAvatarText}>{post.avatarText}</Text>
              </View>
              <View style={styles.postHeaderInfo}>
                <Text style={[styles.authorName, { color: colors.text }]}>{post.author}</Text>
                <View style={styles.postMetaRow}>
                  <View style={styles.tripBadge}>
                    <Text style={styles.tripBadgeText}>{post.tripName}</Text>
                  </View>
                  <Text style={[styles.timeAgoText, { color: colors.textSecondary }]}>• {post.timeAgo}</Text>
                </View>
              </View>
            </View>

            {/* Location Pill */}
            {post.location ? (
              <View style={styles.locationContainer}>
                <Feather name="map-pin" size={13} color="#00A896" style={{ marginRight: 4 }} />
                <Text style={styles.locationPillText}>{post.location}</Text>
              </View>
            ) : null}

            {/* Post Image */}
            <Image source={{ uri: post.imageUri }} style={styles.postImage} resizeMode="cover" />

            {/* Post Caption */}
            <View style={styles.captionWrapper}>
              <Text style={[styles.captionText, { color: colors.text }]}>{post.caption}</Text>
            </View>

            {/* Social Action Bar (Like, Comment, Share) */}
            <View style={[styles.socialActionBar, { borderTopColor: colors.border }]}>
              {/* Like Option */}
              <TouchableOpacity style={styles.socialActionButton} onPress={() => toggleLike(post.id)} activeOpacity={0.7}>
                <Feather
                  name="heart"
                  size={20}
                  color={post.isLiked ? '#EF4444' : colors.textMuted}
                />
                <Text style={[styles.socialActionLabel, { color: post.isLiked ? '#EF4444' : colors.textSecondary }]}>
                  {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                </Text>
              </TouchableOpacity>

              {/* Comment Option */}
              <TouchableOpacity style={styles.socialActionButton} activeOpacity={0.7}>
                <Feather name="message-circle" size={20} color={colors.textMuted} />
                <Text style={[styles.socialActionLabel, { color: colors.textSecondary }]}>
                  {post.commentsCount} Comments
                </Text>
              </TouchableOpacity>

              {/* Share Option */}
              <TouchableOpacity style={styles.socialActionButton} onPress={() => handleSharePost(post)} activeOpacity={0.7}>
                <Feather name="share-2" size={18} color="#6366F1" />
                <Text style={[styles.socialActionLabel, { color: '#6366F1' }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', marginBottom: 2 },
  headerSubtitle: { fontSize: 13 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  createPostCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    marginBottom: 20,
  },
  createPostTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00A896',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  createPostInput: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 80,
  },
  createPostActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  photoAttachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  photoAttachText: { fontSize: 13, fontWeight: '700', color: '#00A896' },
  postSubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A896',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  postSubmitText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  postCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00A896',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorAvatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 17 },
  postHeaderInfo: { flex: 1 },
  authorName: { fontSize: 15, fontWeight: '800' },
  postMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2, flexWrap: 'wrap', gap: 6 },
  tripBadge: {
    backgroundColor: '#EEF6F8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tripBadgeText: { color: '#00A896', fontSize: 11, fontWeight: '800' },
  timeAgoText: { fontSize: 11 },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  locationPillText: { fontSize: 12, fontWeight: '700', color: '#00A896' },
  postImage: {
    width: '100%',
    height: 250,
  },
  captionWrapper: {
    padding: 14,
  },
  captionText: { fontSize: 14, lineHeight: 20 },
  socialActionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  socialActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  socialActionLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
});
