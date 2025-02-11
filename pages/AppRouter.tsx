import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BooksListPage from './BooksListPage';
import BookDetailsPage from './BookDetailsPage';
import AuthorsListPage from './AuthorsListPage';
import AuthorDetailsPage from './AuthorDetailsPage';
import LoginPage from './LoginPage';

import { RootState } from './../utils/store';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useSelector } from 'react-redux';
import { config } from '@/gluestack-ui.config';
import Dashboard from './Dashboard';
import { COLORMODES } from '@gluestack-style/react/lib/typescript/types';

const MainStack = createStackNavigator();

export default function AppRouter() {

  const theme = useSelector((state: RootState) => state.theme);

  return (
    <GluestackUIProvider colorMode={theme.darkMode as COLORMODES} config={config}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
          <MainStack.Screen name="Main" component={Dashboard} options={{ headerShown: false }} />
          <MainStack.Screen name="BooksList" component={BooksListPage} options={{ headerTitle: "Books List" }} />
          <MainStack.Screen name="AuthorsList" component={AuthorsListPage} options={{ headerTitle: "Authors List" }}/>
          <MainStack.Screen name="BookDetails"  component={BookDetailsPage} options={{ headerTitle: "Book Details" }}/>
          <MainStack.Screen name="AuthorDetails" component={AuthorDetailsPage} options={{ headerTitle: "Author Details" }} />
        </MainStack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

