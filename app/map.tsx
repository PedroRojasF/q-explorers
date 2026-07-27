import { useState } from 'react';
import { router } from 'expo-router';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, BottomNav, JourneyScreen, PrimaryButton } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { worlds } from '@/data/journey';
import { useJourney } from '@/lib/JourneyContext';

const positions = [
  { left: '15%', top: '8%' }, { left: '58%', top: '18%' }, { left: '70%', top: '39%' },
  { left: '29%', top: '48%' }, { left: '50%', top: '68%' }, { left: '82%', top: '57%' },
] as const;

const constellationAssets: ImageSourcePropType[] = [
  require('@/assets/qubitpacha/constellation-llama.png'), require('@/assets/qubitpacha/constellation-llama.png'),
  require('@/assets/qubitpacha/constellation-puma.png'), require('@/assets/qubitpacha/constellation-puma.png'),
  require('@/assets/qubitpacha/constellation-snake.png'), require('@/assets/qubitpacha/constellation-snake.png'),
];

export default function MapScreen() {
  const { stars, completed } = useJourney();
  const [selected, setSelected] = useState(1);
  const probabilityDone = completed.includes('hadamard-100');
  const selectedWorld = worlds[selected];
  const available = selected <= 1;

  const explore = () => selected === 1 ? router.push('/probability') : router.push(`/world/${selectedWorld.id}` as never);

  return (
    <JourneyScreen dark scroll={false} style={styles.screen}>
      <View style={styles.main}>
        <AppHeader dark title="Mapa de constelaciones" right={<Text style={styles.stars}>★ {stars}</Text>} />
        <Text style={styles.hint}>Elige una constelación para descubrir su misión</Text>
        <View style={styles.map}>
          <Image source={constellationAssets[selected]} style={styles.constellation} resizeMode="cover" />
          <View style={styles.imageShade} />
          <View style={styles.pathOne} /><View style={styles.pathTwo} /><View style={styles.pathThree} />
          {worlds.map((world, index) => {
            const nodeAvailable = index <= 1;
            const complete = (index === 0 && completed.length >= 4) || (index === 1 && probabilityDone);
            const active = selected === index;
            return <Pressable key={world.id} onPress={() => setSelected(index)} accessibilityRole="button" accessibilityLabel={`${world.title}, ${nodeAvailable ? 'disponible' : 'bloqueado'}`} style={[styles.nodeWrap, positions[index]]}>
              <View style={[styles.node, nodeAvailable && { borderColor: world.color }, active && styles.nodeGlow, complete && { backgroundColor: Colors.green }]}>
                <Text style={[styles.nodeText, !nodeAvailable && styles.nodeLocked]}>{complete ? '✓' : world.number}</Text>
              </View>
              {active && <Text style={styles.nodeLabel}>{world.title}</Text>}
              {!nodeAvailable && <Text style={styles.lock}>bloqueado</Text>}
            </Pressable>;
          })}
        </View>
        <View style={styles.sheet}>
          <View style={styles.sheetTitleRow}><View style={[styles.badge, { backgroundColor: selectedWorld.color }]}><Text style={styles.badgeText}>{selectedWorld.number}</Text></View><View style={{ flex: 1 }}><Text style={styles.sheetTitle}>{selectedWorld.title}</Text><Text style={styles.sheetTheme}>{selectedWorld.theme}</Text></View></View>
          <Text style={styles.sheetCopy}>{selected === 1 ? 'Predice el efecto de Hadamard, ejecuta 100 mediciones y descubre el patrón cuántico.' : selectedWorld.description}</Text>
          {available ? <PrimaryButton secondary label={selected === 1 ? (probabilityDone ? 'Repetir experimento' : 'Iniciar demo de probabilidad') : 'Explorar mundo'} onPress={explore} /> : <Text style={styles.requirement}>Completa los mundos anteriores para desbloquear</Text>}
        </View>
      </View>
      <BottomNav />
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0 }, main: { flex: 1, paddingHorizontal: 16 }, stars: { color: Colors.gold, fontSize: 17, fontFamily: 'Nunito_800ExtraBold' }, hint: { color: '#C5D9D8', textAlign: 'center', fontFamily: 'Nunito_600SemiBold', fontSize: 12, marginTop: -4 },
  map: { flex: 1, position: 'relative', marginTop: 8, minHeight: 380, borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(241,181,42,.45)' }, constellation: { ...StyleSheet.absoluteFill, width: '100%', height: '100%', opacity: .76 }, imageShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(3,26,45,.32)' },
  pathOne: { position: 'absolute', width: '48%', borderTopWidth: 2, borderStyle: 'dotted', borderColor: '#F1B52A', left: '22%', top: '21%', transform: [{ rotate: '20deg' }] }, pathTwo: { position: 'absolute', width: '45%', borderTopWidth: 2, borderStyle: 'dotted', borderColor: '#F1B52A', left: '25%', top: '53%', transform: [{ rotate: '65deg' }] }, pathThree: { position: 'absolute', width: '42%', borderTopWidth: 2, borderStyle: 'dotted', borderColor: '#F1B52A', left: '48%', top: '65%', transform: [{ rotate: '-28deg' }] },
  nodeWrap: { position: 'absolute', alignItems: 'center', width: 104, marginLeft: -52 }, node: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(3,26,45,.92)', borderWidth: 3, borderColor: '#71808A', alignItems: 'center', justifyContent: 'center' }, nodeGlow: { borderColor: Colors.gold, shadowColor: Colors.gold, shadowOpacity: 1, shadowRadius: 14, elevation: 8 }, nodeText: { color: Colors.white, fontFamily: 'Lora_700Bold', fontSize: 20 }, nodeLocked: { color: '#95A6A8' }, nodeLabel: { color: Colors.gold, fontFamily: 'Nunito_800ExtraBold', fontSize: 10, marginTop: 4, textAlign: 'center' }, lock: { color: '#A9BBBC', fontFamily: 'Nunito_600SemiBold', fontSize: 8, marginTop: 2 },
  sheet: { backgroundColor: 'rgba(3,26,45,.94)', borderRadius: 18, borderWidth: 1, borderColor: '#D89416', padding: 14, marginTop: 10, marginBottom: 10 }, sheetTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, badge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }, badgeText: { color: Colors.white, fontFamily: 'Lora_700Bold' }, sheetTitle: { color: Colors.white, fontFamily: 'Lora_700Bold', fontSize: 17 }, sheetTheme: { color: Colors.gold, fontFamily: 'Nunito_600SemiBold', fontSize: 11 }, sheetCopy: { color: '#DCE8E5', fontFamily: 'Nunito_400Regular', fontSize: 12, lineHeight: 17, marginVertical: 10 }, requirement: { color: Colors.gold, fontFamily: 'Nunito_700Bold', fontSize: 11, textAlign: 'center', paddingVertical: 8 },
});
