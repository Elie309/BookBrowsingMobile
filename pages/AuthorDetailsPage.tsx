import React, { useEffect, useState } from 'react';
import { Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, ParamListBase } from '@react-navigation/native';
import { Author, AuthorServices } from '@elie309/bookbrowsinglibrary';
import { Box, Text } from '@gluestack-ui/themed';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthorDetailsRouteProp = RouteProp<{ params: { authorId: string } }, 'params'>;

export default function AuthorDetailsPage() {
  const route = useRoute<AuthorDetailsRouteProp>();
  const { authorId } = route.params;
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { role } = useSelector((state: RootState) => state.user);

  const fetchAuthorDetails = async () => {
    try {
      setLoading(true);
      const fetchedAuthor = await AuthorServices.fetchAuthorDetail(authorId);
      setAuthor(fetchedAuthor);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "books") {
      navigation.replace("BooksList");
    }
    fetchAuthorDetails();
  }, [authorId]);

  if (loading) {
    return (
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Box>
    );
  }

  if (!author) {
    return (
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Author not found</Text>
      </Box>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }} textAlign='center'>{author.name}</Text>
      <Box style={{ flexDirection: 'column', marginBottom: 16, alignItems: 'center' }}>
        {author.photosUrl.length > 0 ? (
          <Image source={{ uri: author.photosUrl[0] }} style={{ width: 150, height: 250, marginRight: 16 }} />
        ) : (
          <Box style={{ width: 150, height: 250, backgroundColor: '#ccc', marginRight: 16 }} />
        )}
      </Box>
      <Box style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          {author.bio}
        </Text>

        <Text bold>Born: </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          {author.birthDate || 'Unknown'}
        </Text>

        <Text bold>Died: </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          {author.deathDate || 'Unknown'}
        </Text>

        <Text bold>Top Work:</Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          {author.topWork || 'Unknown'}
        </Text>

        <Text bold>Alternate Names:</Text>
        <Text style={{ fontSize: 16 }}>
          {author.alternateNames?.join(', ') || 'Unknown'}
        </Text>
      </Box>
    </ScrollView>
  );
}
