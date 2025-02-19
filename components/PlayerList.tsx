import { ScrollView } from 'react-native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Player {
  phoneNumber: string;
  name: string;
  battingStyle: string;
  isOut: boolean;
}

interface PlayerListProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  allowEditing?: boolean;
}

const { width } = Dimensions.get('window'); // Get screen width

const PlayerList: React.FC<PlayerListProps> = ({ players, setPlayers, allowEditing = true }) => {
  const generatePhoneNumber = () => {
    let phoneNumber: string;
    do {
      const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
      phoneNumber = `+91${randomNum}`;
    } while (players.some(player => player.phoneNumber === phoneNumber));
    return phoneNumber;
  };

  const addPlayer = () => {
    setPlayers([...players, { phoneNumber: generatePhoneNumber(), name: '', battingStyle: '', isOut: false }]);
  };

  const removePlayer = (phoneNumber: string) => {
    setPlayers(players.filter(player => player.phoneNumber !== phoneNumber));
  };

  const updatePlayerName = (phoneNumber: string, name: string) => {
    setPlayers(players.map(player => (player.phoneNumber === phoneNumber ? { ...player, name } : player)));
  };

  const updateBattingStyle = (phoneNumber: string, style: string) => {
    setPlayers(players.map(player => (player.phoneNumber === phoneNumber ? { ...player, battingStyle: style } : player)));
  };

  const BattingStyleSelector = ({ phoneNumber, currentStyle }: { phoneNumber: string; currentStyle: string }) => {
    return (
      <View style={styles.battingStyleWrapper}>
        {['L', 'R'].map(style => (
          <TouchableOpacity
            key={style}
            style={[styles.battingStyleButton]}
            onPress={() => updateBattingStyle(phoneNumber, style)}
            disabled={!allowEditing}
          >
            <Text style={[styles.battingStyleText, currentStyle === style && styles.activeStyleButton]}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.playerListContainer}>
      <View style={styles.playerInfoHeadersTitle}>
        <Text style={styles.headerText}>Enter your name</Text>
        <Text style={styles.headerText}>Batting Style</Text>
        <Text style={styles.headerText}>Player ID</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <View key={player.phoneNumber} style={styles.playerInfoRow}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => updatePlayerName(player.phoneNumber, text)}
              value={player.name}
              placeholder="Enter Name"
              editable={allowEditing}
            />
            <Text style={styles.playerNumberDisplay}>Player {index + 1}</Text>

            <BattingStyleSelector phoneNumber={player.phoneNumber} currentStyle={player.battingStyle} />
            <View style={styles.playerIdContent}>
              <Text style={styles.playerIdText}>{player.phoneNumber}</Text>
              {allowEditing && (
                <TouchableOpacity onPress={() => removePlayer(player.phoneNumber)}>
                  <Icon name="minuscircle" color="#F67676" size={27} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      {allowEditing && (
        <TouchableOpacity onPress={addPlayer} style={styles.addButtonContainer}>
          <Icon name="pluscircleo" color="#00A2B4" size={50} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playerListContainer: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: width * 0.1, // Use percentage of screen width for padding
    paddingRight: width * 0.1, // Use percentage of screen width for padding
    backgroundColor: '#F7F7F7',
  },
  playerInfoHeadersTitle: {
    flexDirection: 'row',
    gap: width * 0.1, // Adjust gap based on screen size
    marginBottom: 10,
    justifyContent: 'space-between', // Ensure headers are spaced correctly
  },
  headerText: {
    fontWeight: '700',
    fontSize: width > 350 ? 20 : 16, // Adjust font size based on screen width
  },
  playerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.2, // Adjust gap based on screen width
    marginVertical: 10,
  },
  input: {
    height: 54,
    width: width * 0.4, // Set width relative to screen size
    borderWidth: 2,
    paddingLeft: 17,
    borderRadius: 5,
    fontSize: 23,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
  playerNumberDisplay: {
    position: 'absolute',
    left: 10,
    bottom: 44,
    paddingLeft: 4,
    paddingRight: 5,
    fontSize: 15,
    backgroundColor: '#F7F7F7',
    color: '#00A2B4',
  },
  battingStyleWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  battingStyleButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 46,
    borderColor: '#00A2B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStyleButton: {
    backgroundColor: '#00A2B4',
    color: '#FFFFFF',
  },
  battingStyleText: {
    fontSize: 20,
    color: '#00A2B4',
    fontWeight: '700',
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 46,
    borderColor: '#00A2B4',
    textAlign: 'center',
    lineHeight: 30,
  },
  playerIdContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    marginLeft: 25,
  },
  playerIdText: {
    fontSize: 18,
    fontWeight: '400',
  },
  addButtonContainer: {
    width: 50,
    left: width * 0.1, // Adjust position based on screen size
    bottom: 20,
  },
});

export default PlayerList;
