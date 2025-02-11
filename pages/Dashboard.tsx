import { Box, Button, ButtonText, Heading, Text } from "@gluestack-ui/themed";
import { StackNavigationProp } from '@react-navigation/stack';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import { logout } from "@/utils/slices/userSlice";
import Logo from "@/utils/Logo";


export default function Dashboard() {

    const role = useSelector((state: RootState) => state.user.role);

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigation.replace('Login');
    }

    return (
        <Box
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', minHeight: '100%'
            }}
        >

            <Logo width="150" height="150" stroke="black" fill={"none"} className=""  />

            <Heading size="4xl" textAlign="center"
                color='primary'
            >
                Dashboard
            </Heading>

            <Text size="2xl" textAlign="center" sx={{ marginVertical: 4 }}>
                Let us look for your favorite...
            </Text>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, marginVertical: 4 }}>
                {role === 'all' && (
                   <>
                     <Button variant="outline" size="xl" onPress={() => navigation.navigate('BooksList')}>
                         <ButtonText> Books</ButtonText>
                     </Button>
                     <Button variant="outline" size="xl" onPress={() => navigation.navigate('AuthorsList')}>
                         <ButtonText> Authors</ButtonText>
                     </Button>
                   </>
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


            <Button variant="outline" size="md" onPress={handleLogout} sx={{ position: "absolute", top: 30, right:15 ,borderColor: 'red' }}>
                <ButtonText sx={{ color: 'red' }}>Logout</ButtonText>
            </Button>
        </Box>
    )
}