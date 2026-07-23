import { ReactNode } from 'react';
import { router, usePathname } from 'expo-router';
import { Image, ImageBackground, Pressable, ScrollView, StatusBar, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export function JourneyScreen({ children, dark = false, scroll = true, style }: { children: ReactNode; dark?: boolean; scroll?: boolean; style?: StyleProp<ViewStyle> }) {
  const Container = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={[styles.safe, dark ? styles.dark : styles.paper]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={dark ? Colors.night : Colors.paper} />
      {dark && <ImageBackground source={require('@/assets/qubitpacha/galaxy-portrait.png')} style={StyleSheet.absoluteFill} imageStyle={styles.skyImage}><View style={styles.skyOverlay} /></ImageBackground>}
      <Container style={[styles.flex, style]} contentContainerStyle={scroll ? styles.content : undefined} showsVerticalScrollIndicator={false}>
        {dark && <StarField />}
        {children}
      </Container>
    </SafeAreaView>
  );
}

export function StarField() {
  const stars = [
    [8, 5, 2], [18, 14, 1], [26, 7, 2], [39, 18, 1], [53, 5, 1], [67, 12, 2], [82, 7, 1], [92, 20, 2],
    [11, 36, 1], [30, 30, 2], [47, 42, 1], [61, 33, 1], [76, 39, 2], [89, 31, 1], [20, 58, 1], [43, 62, 2],
    [69, 57, 1], [94, 67, 2], [7, 76, 1], [31, 83, 1], [58, 79, 2], [81, 88, 1],
  ];
  return <View pointerEvents="none" style={StyleSheet.absoluteFill}>{stars.map(([left, top, size], i) => <View key={i} style={[styles.star, { left: `${left}%`, top: `${top}%`, width: size, height: size }]} />)}</View>;
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.brandRow}>
      <Image source={require('@/assets/qubitpacha/logo.png')} style={[styles.logo, compact && styles.logoCompact]} resizeMode="contain" accessibilityLabel="Chakana de QubitPacha" />
      <View><Text style={[styles.brand, compact && { fontSize: 24 }]}>QubitPacha</Text><Text style={styles.brandSub}>Explora el universo cuántico</Text></View>
    </View>
  );
}

export function AppHeader({ title, dark = false, back = false, right }: { title: string; dark?: boolean; back?: boolean; right?: ReactNode }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide}>{back && <Pressable onPress={() => router.back()} hitSlop={12}><Text style={[styles.back, dark && styles.textLight]}>‹</Text></Pressable>}</View>
      <Text style={[styles.headerTitle, dark && styles.textLight]}>{title}</Text>
      <View style={[styles.headerSide, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
}

export function PrimaryButton({ label, onPress, secondary = false, disabled = false }: { label: string; onPress: () => void; secondary?: boolean; disabled?: boolean }) {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, disabled && { opacity: .45 }, pressed && { transform: [{ scale: .985 }], opacity: .9 }]}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

export function PaperCard({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function ProgressBar({ value, dark = false }: { value: number; dark?: boolean }) {
  return <View style={[styles.progressTrack, dark && { backgroundColor: '#31505A' }]}><View style={[styles.progressFill, { width: `${Math.max(0, Math.min(100, value))}%` }]} /></View>;
}

const navItems = [
  { path: '/map', icon: '⌂', label: 'Mapa' },
  { path: '/missions', icon: '✦', label: 'Misiones' },
  { path: '/journal', icon: '▤', label: 'Diario' },
  { path: '/profile', icon: '♙', label: 'Perfil' },
] as const;

export function BottomNav({ teacher = false }: { teacher?: boolean }) {
  const pathname = usePathname();
  const items = teacher ? [
    { path: '/teacher', icon: '⌂', label: 'Inicio' },
    { path: '/class/2a', icon: '◉', label: 'Clases' },
    { path: '/assign', icon: '✓', label: 'Asignar' },
    { path: '/resources', icon: '▤', label: 'Recursos' },
  ] as const : navItems;
  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const active = pathname === item.path || (item.path.includes('/class') && pathname.includes('/class'));
        return <Pressable key={item.path} onPress={() => router.replace(item.path as never)} style={styles.navItem}><Text style={[styles.navIcon, active && styles.navActive]}>{item.icon}</Text><Text style={[styles.navLabel, active && styles.navActive]}>{item.label}</Text></Pressable>;
      })}
    </View>
  );
}

export function Stat({ value, label, icon }: { value: string | number; label: string; icon?: string }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{icon} {value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 }, flex: { flex: 1 }, paper: { backgroundColor: Colors.paper }, dark: { backgroundColor: Colors.night }, skyImage: { opacity: .72 }, skyOverlay: { flex: 1, backgroundColor: 'rgba(3,26,45,.38)' },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 30 },
  star: { position: 'absolute', borderRadius: 5, backgroundColor: '#F7C55B', opacity: .8 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 60, height: 60 }, logoCompact: { width: 40, height: 40 },
  brand: { color: Colors.white, fontSize: 34, fontFamily: 'Lora_700Bold' }, brandSub: { color: '#F3C976', fontSize: 12, fontFamily: 'Nunito_600SemiBold' },
  header: { minHeight: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerSide: { width: 44 },
  headerTitle: { flex: 1, color: Colors.ink, fontSize: 20, fontFamily: 'Lora_700Bold', textAlign: 'center' }, back: { fontSize: 38, color: Colors.ink, lineHeight: 40 }, textLight: { color: Colors.white },
  button: { minHeight: 50, borderRadius: 14, backgroundColor: Colors.orange, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#B94413' },
  buttonSecondary: { backgroundColor: Colors.teal, borderColor: '#00555B' }, buttonLabel: { color: Colors.white, fontFamily: 'Nunito_800ExtraBold', fontSize: 15 },
  card: { backgroundColor: Colors.paperCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.line, shadowColor: '#6D4A1B', shadowOpacity: .08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  progressTrack: { height: 7, borderRadius: 5, backgroundColor: '#E4D1AA', overflow: 'hidden' }, progressFill: { height: '100%', borderRadius: 5, backgroundColor: Colors.teal },
  bottomNav: { minHeight: 68, flexDirection: 'row', backgroundColor: Colors.paper, borderTopWidth: 1, borderTopColor: Colors.line, paddingHorizontal: 6, paddingBottom: 4 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 }, navIcon: { fontSize: 20, color: Colors.inkSoft }, navLabel: { fontSize: 10, color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold' }, navActive: { color: Colors.orange },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 8 }, statValue: { color: Colors.ink, fontSize: 18, fontFamily: 'Nunito_800ExtraBold' }, statLabel: { color: Colors.inkSoft, fontSize: 10, marginTop: 2, textAlign: 'center', fontFamily: 'Nunito_600SemiBold' },
});
