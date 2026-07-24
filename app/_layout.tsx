import { Stack } from 'expo-router';
import { useFonts as useLoraFonts, Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora';
import { useFonts as useNunitoFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { Colors } from '@/constants/Colors';
import { JourneyProvider } from '@/lib/JourneyContext';

export default function RootLayout() {
  const [loraLoaded] = useLoraFonts({ Lora_400Regular, Lora_700Bold });
  const [nunitoLoaded] = useNunitoFonts({ Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold });

  if (!loraLoaded || !nunitoLoaded) return null;

  return (
    <JourneyProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: Colors.paper } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="mission/[id]" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="quantum-invite" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="quantum-lab" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="reward" options={{ animation: 'fade' }} />
      </Stack>
    </JourneyProvider>
  );
}
