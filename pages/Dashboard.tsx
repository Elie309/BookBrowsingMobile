import { Box, Button, ButtonText, Heading, Text } from "@gluestack-ui/themed";
import { StackNavigationProp } from '@react-navigation/stack';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store";


export default function Dashboard() {

    const role = useSelector((state: RootState) => state.user.role);

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    return (
        <Box
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', minHeight: '100%'
            }}
        >
            <Heading size="4xl" textAlign="center"
                color='primary'
            >
                Dashboard
            </Heading>

            <Text size="2xl" textAlign="center" sx={{ marginVertical: 4 }}>
                Let us look for your favorite...
            </Text>
            {role === 'all' && (
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, marginVertical: 4 }}>
                    <Button variant="outline" size="xl" onPress={() => navigation.navigate('BooksList')}>
                        <ButtonText> Books</ButtonText>
                    </Button>
                    <Button variant="outline" size="xl" onPress={() => navigation.navigate('AuthorsList')}>
                        <ButtonText> Authors</ButtonText>
                    </Button>
                </Box>
            )}
            {role === 'books' && (
                <>
                    <Button variant="outline" sx={{ marginVertical: 4 }} size="xl" onPress={() => navigation.navigate('BooksList')}>
                        <ButtonText> Books</ButtonText>
                    </Button>
                </>
            )}
            {role === 'authors' && (
                <>
                    <Button variant="outline" sx={{ marginVertical: 4 }} size="xl" onPress={() => navigation.navigate('AuthorsList')}>
                        <ButtonText> Authors</ButtonText>
                    </Button>
                </>
            )}
        </Box>
    )
}