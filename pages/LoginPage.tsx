import { Box, Button, EyeIcon, EyeOffIcon, Heading, Icon, 
    Input, InputField, InputSlot, Text, KeyboardAvoidingView } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Logo from '@/utils/Logo';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { login } from '@/utils/slices/userSlice';

const users = [
    {
        username: "123",
        password: "123",
        role: "all"

    },
    {
        username: "grappasystems3@gmail.com",
        password: "GSRecruit2025",
        role: "all"
    },
    {
        username: "grappasystems4@gmail.com",
        password: "GSRecruit2025",
        role: "authors"
    },
    {
        username: "grappasystems5@gmail.com",
        password: "GSRecruit2025",
        role: "books"
    },

]


export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const dispatch = useDispatch();

    const handleLogin = () => {

        // if (!username || !password) {
        //     setError('Please enter username and password.');
        //     return;
        // }

        // if(username.length < 3) {
        //     setError('Username must be at least 3 characters long.');
        //     return;
        // }

        // if (password.length < 8) {
        //     setError('Password must be at least 8 characters long.');
        //     return;
        // }

        // const user = users.find(user => user.username === username && user.password === password);
        // if (user) {
            setError('');
            dispatch(login({ username: "123", role: "books" }));
            navigation.navigate('Main');

        // } else {
        //     setError('Invalid username or password.');
        // }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ width: "100%", padding: 4, maxWidth: "80%", gap: 15 }}>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                        <Logo width='150' height='150' stroke='black' className='' fill={"none"} />

                        <Heading size='4xl' sx={{ textAlign: "center" }}>Login</Heading>

                        <Text size='xl' sx={{ textAlign: "center" }}>Your favorite Books & Authors Library</Text>
                    </Box>
                    <Input
                        variant="outline"
                        size="md"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        style={{ width: '100%' }}
                    >
                        <InputField
                            placeholder='Username or email'
                            value={username}
                            onChangeText={(value) => setUsername(value)}
                        />
                    </Input>
                    <Input
                        variant="outline"
                        size="md"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        style={{ width: '100%' }}
                    >
                        <InputField
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                        />
                        <InputSlot sx={{ paddingRight: 8 }} onPress={() => setShowPassword(!showPassword)}>
                            <Icon as={showPassword ? EyeIcon : EyeOffIcon} />
                        </InputSlot>
                    </Input>
                    {error && <Text textAlign='center' style={{ color: 'red' }}>{error}</Text>}
                    <Button
                        size="md"
                        isDisabled={false}
                        onPress={handleLogin}
                    >
                        <Text>
                            Login
                        </Text>
                    </Button>
                </Box>
            </Box>
        </KeyboardAvoidingView>

    );

};

