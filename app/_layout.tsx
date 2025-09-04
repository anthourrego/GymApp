import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Slot, usePathname } from 'expo-router';
import 'react-native-reanimated';

import './global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Loading } from '../components/Loading';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import store from '../src/store/store';

// Tema personalizado para React Native Paper
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#8B5CF6', // Purple
		accent: '#EC4899', // Pink
		background: '#0F172A', // Dark slate
		surface: 'rgba(255, 255, 255, 0.1)', // Semi-transparent
		text: '#FFFFFF',
		placeholder: '#94A3B8',
		backdrop: 'rgba(0, 0, 0, 0.5)',
	},
	fonts: {
		...DefaultTheme.fonts,
		bodySmall: {
			fontFamily: 'System',
			fontWeight: '400',
			fontSize: 12,
			lineHeight: 16,
		},
	},
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Provider store={store}>
				<AuthProvider>
					<PaperProvider theme={MD3LightTheme}>
						<AuthNavigator />
						{/* <Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='auto' /> */}
					</PaperProvider>
				</AuthProvider>
			</Provider>
		</ThemeProvider>
	);
}

function AuthNavigator() {
	const { isAuthenticated, isLoading } = useAuth();
	const pathName = usePathname();

	if (isLoading) return <Loading />;

	return !isAuthenticated && pathName != '/login' ? <Redirect href='/(auth)/login' /> : <Slot />;
}
