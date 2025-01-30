import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Switch, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function MatchInfo() {
  const [category, setCategory] = useState('adults');
  const [difficulty, setDifficulty] = useState('beginner');
  const [overs, setOvers] = useState(3);
  const [isAutoSelection, setIsAutoSelection] = useState(true);
  const [selectedBowler, setSelectedBowler] = useState(null);

  const bowlers = [
    { id: 1, name: 'Aswin', image: '' },
    { id: 2, name: 'Ishant', image: '' },
    { id: 3, name: 'Deepak', image: '' },
    { id: 4, name: 'Shakib', image: '' },
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.title}>MATCH INFO</Text>

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Choose your Category</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[styles.radio, category === 'adults' && styles.radioSelected]}
                  onPress={() => setCategory('adults')}>
                  <Text style={styles.radioText}>Adults</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radio, category === 'kids' && styles.radioSelected]}
                  onPress={() => setCategory('kids')}>
                  <Text style={styles.radioText}>Kids</Text>
                </TouchableOpacity>
              </View>
            </View>

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

          {/* Right Column */}
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

        {/* Select Bowlers & Action Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Bowlers</Text>
          <View style={styles.bowlersGrid}>
            {bowlers.map((bowler) => (
              <TouchableOpacity
                key={bowler.id}
                style={[
                  styles.bowlerCard,
                  selectedBowler === bowler.id && styles.bowlerCardSelected
                ]}
                onPress={() => setSelectedBowler(bowler.id)}>
                <Image
                  source={{ uri: bowler.image }}
                  style={styles.bowlerImage}
                />
                <Text style={styles.bowlerName}>{bowler.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.goBackButton}>
            <Text style={styles.buttonText}> Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startGameButton}>
            <Text style={styles.buttonText}>Start Game →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
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
    flexWrap: 'wrap', // This allows items to wrap onto the next line if necessary
  },
  column: {
    width: '48%', // Adjust based on screen size
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  radio: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00A3B4',
  },
  radioSelected: {
    backgroundColor: '#00A3B4',
    color: '#FFFFFF'
  },
  radioText: {
    color: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#00A3B4',
    borderRadius: 4,
  },
  picker: {
    height: 50,
  },
  oversSelector: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggleText: {
    fontSize: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  scoreBox: {
    borderWidth: 1,
    borderColor: '#00A3B4',
    borderRadius: 4,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  goBackButton: {
    backgroundColor: '#00A3B4',
    padding: 16,
    borderRadius: 8,
    width: '45%',
  },
  startGameButton: {
    backgroundColor: '#00A3B4',
    padding: 16,
    borderRadius: 8,
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
