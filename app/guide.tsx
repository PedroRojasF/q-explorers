import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, JourneyScreen, PrimaryButton } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { guides } from '@/data/journey';
import { useJourney } from '@/lib/JourneyContext';

export default function GuidePicker() {
  const { guide, setGuide } = useJourney();
  return (
    <JourneyScreen scroll={false}>
      <View style={styles.page}>
        <AppHeader title="Elige tu guía" back />
        <Text style={styles.sub}>Te acompañará en tu viaje</Text>
        <View style={styles.list}>
          {guides.map((item) => {
            const active = guide === item.id;
            return <Pressable key={item.id} onPress={() => setGuide(item.id)} style={[styles.guide, active && styles.active, { backgroundColor: active ? item.color : Colors.paperCard }]}>
              {item.id === 'kusi' ? <Image source={require('@/assets/qubitpacha/kusi.png')} style={styles.kusi} resizeMode="contain" /> : <Text style={styles.animal}>{item.animal}</Text>}<View style={styles.guideCopy}><Text style={[styles.name, active && styles.light]}>{item.name}</Text><Text style={[styles.trait, active && styles.light]}>{item.trait}</Text></View>{active && <Text style={styles.check}>✓</Text>}
            </Pressable>;
          })}
        </View>
        <PrimaryButton secondary label={`Elegir a ${guides.find((x) => x.id === guide)?.name}`} onPress={() => router.replace('/map')} />
      </View>
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, paddingHorizontal: 4, paddingBottom: 24 }, sub: { color: Colors.inkSoft, textAlign: 'center', fontSize: 12, marginTop: -6 }, list: { flex: 1, justifyContent: 'center', gap: 12 },
  guide: { minHeight: 118, borderRadius: 18, borderWidth: 1, borderColor: Colors.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, overflow: 'hidden' }, active: { borderColor: Colors.gold, borderWidth: 2 }, animal: { fontSize: 67, width: 100 }, kusi: { width: 105, height: 105, marginLeft: -8 }, guideCopy: { flex: 1 },
  name: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 22 }, trait: { color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold', fontSize: 12, marginTop: 5 }, light: { color: Colors.white }, check: { color: Colors.gold, fontSize: 24, fontWeight: '800' },
});
