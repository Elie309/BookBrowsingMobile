import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Book } from '@elie309/bookbrowsinglibrary';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Text } from '@gluestack-ui/themed';

export default function BookListingItem(book: Book) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('BookDetails', { bookId: book.id })} 
      style={{ 
        marginBottom: 16, 
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center', 
        padding: 8, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 8 
      }}
    >
      {book.cover ? (
        <Image
          source={{ uri: book.cover }}
          style={{ width: 100, height: 150 }}
        />
      ) : (
        <View style={{ width: 100, height: 150, backgroundColor: '#ccc' }} />
      )}
      <Box style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{book.title}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{book.authors.join(', ')}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{book.publishYear}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{book.description}</Text>
      </Box>
    </TouchableOpacity>
  );
}
