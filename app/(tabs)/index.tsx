import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Brand, JourneyScreen, PrimaryButton } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { useJourney } from '@/lib/JourneyContext';

export default function Welcome() {
  const { setRole } = useJourney();
  const choose = (role: 'student' | 'teacher' | 'guest') => {
    setRole(role);
    router.push(role === 'teacher' ? '/teacher' : '/onboarding');
  };

  return (
    <JourneyScreen dark scroll={false}>
      <View style={styles.wrap}>
        <View style={styles.brand}><Brand /></View>
        <View style={styles.cosmos}>
          <Text style={styles.orbit}>·  ✦    ·      ✧</Text>
          <Image source={require('@/assets/qubitpacha/kusi.png')} style={styles.bird} resizeMode="contain" accessibilityLabel="Kusi, colibrí guía" />
          <View style={styles.glow} />
          <Text style={styles.mountains}>▲  ▲▲   ▲</Text>
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>Aprende ciencia{`\n`}mirando las estrellas</Text>
          <Text style={styles.subtitle}>Recorre constelaciones andinas y descubre los fundamentos de la computación cuántica.</Text>
        </View>
        <View style={styles.actions}>
          <PrimaryButton label="Soy estudiante" onPress={() => choose('student')} />
          <PrimaryButton label="Soy profesor" secondary onPress={() => choose('teacher')} />
          <Pressable onPress={() => choose('guest')}><Text style={styles.guest}>Continuar como invitado</Text></Pressable>
        </View>
      </View>
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 22, paddingBottom: 26 }, brand: { paddingTop: 22 },
  cosmos: { flex: 1, minHeight: 250, alignItems: 'center', justifyContent: 'center' }, orbit: { color: Colors.gold, fontSize: 23, letterSpacing: 8, position: 'absolute', top: 36 },
  bird: { width: '100%', height: 255, zIndex: 2, transform: [{ rotate: '-5deg' }] }, glow: { position: 'absolute', width: 210, height: 110, borderRadius: 105, backgroundColor: '#0A5360', opacity: .65, transform: [{ rotate: '-18deg' }] },
  mountains: { position: 'absolute', bottom: 0, color: '#17475A', fontSize: 70, letterSpacing: -12 }, copy: { alignItems: 'center', marginBottom: 20 },
  title: { color: Colors.white, fontFamily: 'Lora_700Bold', fontSize: 29, textAlign: 'center', lineHeight: 35 }, subtitle: { color: '#C8D9D4', fontFamily: 'Nunito_400Regular', fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 360, marginTop: 10 },
  actions: { gap: 10 }, guest: { color: '#D6D9CE', fontSize: 12, fontWeight: '600', textAlign: 'center', paddingVertical: 8, textDecorationLine: 'underline' },
});
