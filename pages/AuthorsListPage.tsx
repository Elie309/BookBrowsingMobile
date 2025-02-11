import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Author, AuthorServices } from '@elie309/bookbrowsinglibrary';
import AuthorListingItem from '../components/AuthorListingItem';
import { RootState } from '../utils/store';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Box, ChevronDownIcon, Input, InputField, Select,
  SelectBackdrop, SelectIcon, SelectInput, SelectItem, Text, SelectTrigger, SelectPortal, SelectContent, SelectDragIndicator,
  SelectSectionHeaderText
} from '@gluestack-ui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

enum Sort {
  NAME = 'name',
  BIRTH_DATE = 'birth_date',
}

export default function AuthorsListPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [textNotFound, setTextNotFound] = useState('Search for authors!');
  const [query, setQuery] = useState('');
  const { role } = useSelector((state: RootState) => state.user);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [sort, setSort] = useState<Sort>(Sort.NAME);
  const containerRef = useRef(null);

  const fetchAuthors = async () => {
    setLoading(true);
    let fetchedAuthors = await AuthorServices.fetchAuthors(query, page, 10, sort);
    setAuthors(prevAuthors => [...prevAuthors, ...fetchedAuthors]);
    setLoading(false);
    setTextNotFound('No authors found!');
  };

  useEffect(() => {
    if (role === "books") {
      navigation.replace("BooksList");
    }
  }, [role]);

  useEffect(() => {
    if (query.length < 3) return;
    fetchAuthors();
  }, [query, page, sort]);

  useEffect(() => {
    setAuthors([]);
    setPage(1);
  }, [query, sort]);

  const handleScroll = (e: any) => {
    const bottom = e.nativeEvent.layoutMeasurement.height + e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height;
    if (bottom && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Box ref={containerRef} sx={{ height: '90%', overflow: 'visible', paddingTop: 16, marginTop: 16, width: '100%' }}>
      <Box sx={{ width: "100%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 4 }}>
        <Select
          defaultValue={Sort.NAME}
          selectedValue={sort}
          onValueChange={(value) => setSort(value as Sort)}
          sx={{ width: '20%', marginRight: 10 }}
        >
          <SelectTrigger
            variant="outline" size="md">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent>
              <SelectDragIndicator>
                <SelectDragIndicator />
              </SelectDragIndicator>
              <SelectItem label="Name" value={Sort.NAME} />
              <SelectItem label="Birth Date" value={Sort.BIRTH_DATE} />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          sx={{ width: '75%' }}
        >
          <InputField
            placeholder='Search'
            value={query}
            onChangeText={(value) => setQuery(value)}
          />
        </Input>
      </Box>

      <ScrollView
        contentContainerStyle={{ marginTop: 8, marginHorizontal: 4, flexDirection: 'column', gap: 4, alignItems: 'center' }}
        onMomentumScrollEnd={handleScroll}
      >
        {authors.length === 0 && !loading && <Box style={{ justifyContent: 'center' }}><Text>{textNotFound}</Text></Box>}
        {authors.map(author => (
          <AuthorListingItem key={author.id + author.name + Math.random()} {...author} />
        ))}
      </ScrollView>
      {loading && <Box sx={{ justifyContent: 'center' }}><ActivityIndicator /></Box>}
    </Box>
  );
}
