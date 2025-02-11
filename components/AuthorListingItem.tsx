import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Author } from '@elie309/bookbrowsinglibrary';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Text } from '@gluestack-ui/themed';

export default function AuthorListingItem(author: Author) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('AuthorDetails', { authorId: author.id })} 
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
      {author.photosUrl.length > 0 ? (
        <Image
          source={{ uri: author.photosUrl[0] }}
          style={{ width: 100, height: 150 }}
        />
      ) : (
        <View style={{ width: 100, height: 150, backgroundColor: '#ccc' }} />
      )}
      <Box style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{author.name}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{author.birthDate}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{author.topWork}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{author.bio}</Text>
      </Box>
    </TouchableOpacity>
  );
}
