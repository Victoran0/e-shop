import {Stack} from 'expo-router'
import { ToastProvider } from 'react-native-toast-notifications'

export default function RootLayout() {
    return (
        <ToastProvider>
            <Stack>
            <Stack.Screen name='(shop)' options={{headerShown: false, title: 'Shop'}} />
            <Stack.Screen name='categories' options={{headerShown: false, title: 'Categories'}} />
            <Stack.Screen name='product' options={{headerShown: false, title: 'Product'}} />
            <Stack.Screen name='cart' options={{presentation: 'modal', headerShown: true, title: 'Shopping Cart'}} />
            <Stack.Screen name='auth' options={{headerShown: false, title: 'Sign in' }} />
            <Stack.Screen name='signup' options={{headerShown: true, title: 'Sign up' }} />
        </Stack>
        </ToastProvider>
    )
}