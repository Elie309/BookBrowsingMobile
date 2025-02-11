import { Box, Button, ButtonIcon, ButtonText, Heading, Icon, MoonIcon, SunIcon, Text } from "@gluestack-ui/themed";
import { StackNavigationProp } from '@react-navigation/stack';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import { logout } from "@/utils/slices/userSlice";
import Logo from "@/utils/Logo";
import { toggleTheme } from "@/utils/slices/themeSlice";


export default function Dashboard() {

    const role = useSelector((state: RootState) => state.user.role);
    const { darkMode } = useSelector((state: RootState) => state.theme);

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const dispatch = useDispatch();

    const isDarkmode = darkMode ? 'dark' : 'light';

    const changeTheme = () => {
        dispatch(toggleTheme());
    }


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

            <Button variant="outline" size="md" onPress={changeTheme} sx={{ position: "absolute", top: 30, left:15 }}>
                <ButtonIcon>
                    <Icon as={isDarkmode === 'dark' ? SunIcon : MoonIcon} size="md" />
                </ButtonIcon>
            </Button>
        </Box>
    )
}