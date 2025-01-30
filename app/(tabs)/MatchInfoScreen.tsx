import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function MatchInfo() {
  const [category, setCategory] = useState('adults');
  const [difficulty, setDifficulty] = useState('beginner');
  const [overs, setOvers] = useState(3);
  const [isAutoSelection, setIsAutoSelection] = useState(true);
  const [selectedBowler, setSelectedBowler] = useState(null);

  const bowlers = [
    { id: 1, name: 'Aswin', image: 'https://s3-alpha-sig.figma.com/img/06d7/eb42/bc32e31670510c58a73c382f45d5a835?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lc-O2XW0sdVb23dMj-fkJJX1SLbU1Ef13VL1HxEDRNlLDG8dQp~isc~czXqxSb3NnJ2JH83VAxNvpzrN-TqFdIy~jlGVXfrIHE2FY0Im-YdjIdeq962sFpw46LQFtBDi4RCL8icaXzRVeHd7zQbk9ZE9ILc0kyHEU6spN2fn8r7jyDpj45N5E5ma74CU4SRbBqPRfhTS8XjLF0Z26IxferSx3F~X4YR1VEkNHHNB3Ul-E3JkkkHqHqGws5uV8L86sSpqKbUNe3ADsKOG4LO52lXSwCXJw~Qq~U0512OA4ZcffQbqA099mKDGRnRt1fZ63xE43bxoPorAhMPQl8pDhA__' },
    { id: 2, name: 'Ishant', image: 'https://s3-alpha-sig.figma.com/img/3633/d9a3/a51b7c2952b662aff20c36e7cbe25ec9?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KolY9EJbHeBPQkjgodFBb6mwl2JEpiN2RtXt0HNv90XBgxDDfebz--bFtYhdbW-8AqUN2greDUSh3JgJAYrEu4eTvj5LbUtsR07qIJTYC3yU4TL~nKz9MjvNYsKF~-5kZEKNn~zU48~1sTX8O7DkGLtw1yq79W47FCK1NeC0Vee3H0F2eRUiP5Kz1hkcx36R8cM9JLMHRmw9-5nCh85NBC4BpOvRaptjSP0y4WLQFyHEAIB3Mn5oIbx0leHG9glUanbH6iBMxmjhlP34qojCLlzGR9qqS7lb5LTqKhbz82c8btbQKLv9GbyHDdrEtTh8hLzs3Qm90a8W5aYGT-7Gyg__' },
    { id: 3, name: 'Deepak', image: 'https://s3-alpha-sig.figma.com/img/32b6/6c9d/4a3bb662f0c29b884693b649b19754ea?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R1mrotDNNqkdQ977ACjr4wy9rNQ0V3EycD~QnSVIzsqwYSxgLqNYmdD6wIMTnZ0LXlz9LV~U~SaQCHRz6URrwcBgaN51ks-P-4MaTLvSCos5gcZ~bYwMWOnREa1iKzeAvr17Ha9OJ0Wyg9onxV6zkdIbxzDSERuWx63ZgRONmkmTyhY4BYHh3PTkbfcurx5o5EpLrYso4EmqFJoN7ubd~NvK-sz~NHAwJGufr0FrQxkqfkKaCSxTnQuBsw9MLSfH-bXNLc2-s-87hh6HEtYIPjs2vH1YgrxXZ2D97TDeW09ev3WTsCVPA5lo9jFWvI9PqM8OKUjer4vtAH-nE4Irfg__' },
    { id: 4, name: 'Shakib', image: 'https://s3-alpha-sig.figma.com/img/91a8/d13b/22e18bfda83e874482f206e2adde113a?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HDo2xGEVwGyCA1lv0-3OLt8ujANaSTO7DF5n6G4~fisI8gJ1NOEeezVcen3pNoetwWIZ11Jc-nIWwMCxxdTBpUunUl~4neWmjac-LgnNcb3qIYgK388YJNpUENxR7Hvhfpg2Lzg7-8ooQtdN9YzwKL205PjGLWUpsyzPPFcsoOXrj9FT6Q0U19mdmpSr3-PkR-ZMZgeq2115w1WhtzjzJ1GoG18PpF3JE1JbPgbAV71jf9Ln9cVPkaKEUWJrQNmVq9H83SUyXLSM32QBAGDiLVH2wkb9AeOMMyG68d-vHogNexa4lqtctc3t0bJC7sfe7mYWoJbbnhvxa0l-c3QatQ__' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>MATCH INFO</Text>

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Choose your Category</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[styles.radio, category === 'adults' && styles.radioSelected]}
                  onPress={() => setCategory('adults')}>
                  <Text style={[styles.radioText, category === 'adults' && styles.radioTextSelected]}>Adults</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radio, category === 'kids' && styles.radioSelected]}
                  onPress={() => setCategory('kids')}>
                  <Text style={[styles.radioText, category === 'kids' && styles.radioTextSelected]}>Kids</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Choose Game Difficulty</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={difficulty}
                  onValueChange={(value) => setDifficulty(value)}
                  style={styles.picker}>
                  <Picker.Item label="Backyard" value="Backyard" />
                  <Picker.Item label="Beginner" value="Beginner" />
                  <Picker.Item label="Intermediate" value="Intermediate" />
                  <Picker.Item label="Expert" value="Expert" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select No. of Overs</Text>
              <View style={styles.oversSelector}>
                <TouchableOpacity
                  style={styles.oversButton}
                  onPress={() => setOvers(Math.max(1, overs - 1))}>
                  <Text style={styles.oversButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.oversCount}>{overs}</Text>
                <TouchableOpacity
                  style={styles.oversButton}
                  onPress={() => setOvers(overs + 1)}>
                  <Text style={styles.oversButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bowler Selection Type</Text>
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>Auto</Text>
                <Switch
                  value={isAutoSelection}
                  onValueChange={setIsAutoSelection}
                  trackColor={{ false: '#767577', true: '#00A3B4' }}
                  thumbColor={isAutoSelection ? '#fff' : '#f4f3f4'}
                />
                <Text style={styles.toggleText}>Manual</Text>
              </View>
            </View>
          </View>

          <View style={styles.column}>
            <View style={[styles.section, styles.scoreSection]}>
              <View style={styles.scoreContainer}>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreLabel}>Target</Text>
                  <Text style={styles.scoreValue}>20</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreLabel}>Balls</Text>
                  <Text style={styles.scoreValue}>18</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Bowlers</Text>
              <View style={styles.bowlersGrid}>
                {bowlers.map((bowler) => (
                  <TouchableOpacity
                    key={bowler.id}
                    style={[
                      styles.bowlerCard,
                      selectedBowler === bowler.id && styles.bowlerCardSelected,
                    ]}
                    onPress={() => setSelectedBowler(bowler.id)}>
                    <Image source={{ uri: bowler.image }} style={styles.bowlerImage} />
                    <Text style={[
                      styles.bowlerName,
                      selectedBowler === bowler.id && styles.bowlerNameSelected
                    ]}>{bowler.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.goBackButton}>
                <Text style={styles.buttonText}>← Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.startGameButton}>
                <Text style={styles.buttonText}>Start Game →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#00A3B4',
    padding: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2D3748',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radio: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00A3B4',
    minWidth: 100,
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#00A3B4',
  },
  radioText: {
    color: '#00A3B4',
  },
  radioTextSelected: {
    color: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#00A3B4',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  oversSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  oversButton: {
    backgroundColor: '#00A3B4',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oversButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  oversCount: {
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  toggleText: {
    fontSize: 16,
    color: '#2D3748',
  },
  scoreSection: {
    marginTop: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scoreBox: {
    borderWidth: 1,
    borderColor: '#00A3B4',
    borderRadius: 8,
    padding: 16,
    width: '45%',
  },
  scoreLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: '#00A3B4',
    marginBottom: 8,
  },
  scoreValue: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  bowlersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  bowlerCard: {
    width: '48%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#00A3B4',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  bowlerCardSelected: {
    backgroundColor: '#00A3B4',
  },
  bowlerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  bowlerName: {
    fontSize: 16,
    color: '#00A3B4',
  },
  bowlerNameSelected: {
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  goBackButton: {
    backgroundColor: '#00A3B4',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  startGameButton: {
    backgroundColor: '#00A3B4',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
