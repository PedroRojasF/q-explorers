import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppHeader, JourneyScreen, PrimaryButton } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';

export default function Onboarding() {
  return (
    <JourneyScreen scroll={false}>
      <View style={styles.page}>
        <AppHeader title="" right={<Text onPress={() => router.replace('/map')} style={styles.close}>×</Text>} />
        <View style={styles.copy}>
          <Text style={styles.title}>Bienvenido,{`\n`}explorador</Text>
          <Text style={styles.body}>En QubitPacha aprenderás conceptos cuánticos mientras recorres constelaciones andinas.</Text>
        </View>
        <View style={styles.illustration}>
          <Text style={styles.spark}>✦     ·       ✧</Text>
          <Image source={require('@/assets/qubitpacha/kusi.png')} style={styles.bird} resizeMode="contain" accessibilityLabel="Kusi, colibrí guía" />
          <View style={styles.ground} />
        </View>
        <View style={styles.dots}><View style={[styles.dot, styles.dotActive]} /><View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} /></View>
        <PrimaryButton label="¡Comencemos!" onPress={() => router.push('/guide')} />
      </View>
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, paddingHorizontal: 4, paddingBottom: 24 }, close: { color: Colors.ink, fontSize: 28 }, copy: { paddingHorizontal: 12, paddingTop: 10 },
  title: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 32, lineHeight: 37 }, body: { color: Colors.ink, fontFamily: 'Nunito_400Regular', fontSize: 15, lineHeight: 22, marginTop: 15, maxWidth: 330 },
  illustration: { flex: 1, alignItems: 'center', justifyContent: 'center' }, bird: { width: '105%', height: 300, transform: [{ rotate: '-4deg' }] }, spark: { position: 'absolute', top: '20%', color: Colors.orange, fontSize: 20, letterSpacing: 7 }, ground: { position: 'absolute', bottom: '23%', width: 260, height: 7, borderRadius: 10, backgroundColor: Colors.paperDeep, transform: [{ rotate: '-7deg' }] },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 7, marginBottom: 26 }, dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#D6C49D' }, dotActive: { backgroundColor: Colors.orange },
});
