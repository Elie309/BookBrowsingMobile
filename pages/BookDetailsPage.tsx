import React, { useEffect, useState } from 'react';
import { Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, ParamListBase } from '@react-navigation/native';
import { Book, BookService } from '@elie309/bookbrowsinglibrary';
import { Box, Text } from '@gluestack-ui/themed';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { StackNavigationProp } from '@react-navigation/stack';

type BookDetailsRouteProp = RouteProp<{ params: { bookId: string } }, 'params'>;

export default function BookDetailsPage() {
  const route = useRoute<BookDetailsRouteProp>();
  const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { role } = useSelector((state: RootState) => state.user);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const fetchedBook = await BookService.fetchBookDetails(bookId);
      setBook(fetchedBook);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "authors") {
      navigation.replace("AuthorsList");
    }
    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return (
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Box>
    );
  }

  if (!book) {
    return (
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Book not found</Text>
      </Box>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }} textAlign='center'>{book.title}</Text>
      <Box style={{ flexDirection: 'column', marginBottom: 16, alignItems: 'center' }}>
        {book.cover ? (
          <Image source={{ uri: book.cover }} style={{ width: 150, height: 250, marginRight: 16 }} />
        ) : (
          <Box style={{ width: 150, height: 250, backgroundColor: '#ccc', marginRight: 16 }} />
        )}
      </Box>
      <Box style={{ flex: 1, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>{book.description}</Text>

        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text bold>Published Year:</Text>
          {book.publishYear || 'Unknown'}</Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text bold>Edition Count:</Text>
          {book.editionCount || 'Unknown'}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text bold>Subjects People:</Text>
          {book.subject_people?.join(', ') || 'Unknown'}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text bold>Places:</Text>
          {book.subject_places?.join(', ') || 'Unknown'}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text bold>Subject Times:</Text>
          {book.subject_times?.join(', ') || 'Unknown'}
        </Text>
        <Text style={{ fontSize: 16 }}>
          <Text bold>Subjects:</Text>
          {book.subjects?.join(', ') || 'Unknown'}
        </Text>
      </Box>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Authors:</Text>
      {book.authors.map((author, index) => (
        <TouchableOpacity key={index} onPress={() => {
          if (role === 'all') {
            navigation.navigate('AuthorDetails', { authorId: book.authorsKey[index] })
          }
        }}>

          <Text style={{ fontSize: 16, color: 'blue' }}>{author}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

