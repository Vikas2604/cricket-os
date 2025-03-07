import { ScrollView } from 'react-native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Player {
  id: number;
  name: string;
  battingStyle: string;
  isOut: boolean;
}

interface PlayerListProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  allowEditing?: boolean; // Allow adding/removing players if true, ensure renderBall is always enabled
}

const PlayerList: React.FC<PlayerListProps> = ({ players, setPlayers, allowEditing = true }) => {
  const generatePlayerId = () => {
    let id: number;
    do {
      id = Math.floor(100000 + Math.random() * 900000);
    } while (players.some(player => player.id === id));
    return id;
  };

  const addPlayer = () => {
    setPlayers([...players, { id: generatePlayerId(), name: '', battingStyle: '', isOut: false }]);
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const updatePlayerName = (id: number, name: string) => {
    setPlayers(players.map(player => (player.id === id ? { ...player, name } : player)));
  };

  const updateBattingStyle = (id: number, style: string) => {
    setPlayers(players.map(player => (player.id === id ? { ...player, battingStyle: style } : player)));
  };

  const BattingStyleSelector = ({ playerId, currentStyle }: { playerId: number; currentStyle: string }) => {
    return (
      <View style={styles.battingStyleWrapper}>
        {['L', 'R'].map(style => (
          <TouchableOpacity
            key={style}
            style={[styles.battingStyleButton]}
            onPress={() => updateBattingStyle(playerId, style)}
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
      <ScrollView>
        {players.map((player, index) => (
          <View key={player.id} style={styles.playerInfoRow}>
            <Text style={styles.playerNumberDisplay}>Player {index + 1}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => updatePlayerName(player.id, text)}
              value={player.name}
              placeholder="Enter Name"
              editable={allowEditing}
            />
            <BattingStyleSelector playerId={player.id} currentStyle={player.battingStyle} />
            <View style={styles.playerIdContent}>
              <Text style={styles.playerIdText}>{player.id}</Text>
              {allowEditing && (
                <TouchableOpacity onPress={() => removePlayer(player.id)}>
                  <Icon name="minuscircle" color="#F67676" size={37} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      {allowEditing && (
        <TouchableOpacity onPress={addPlayer} style={styles.addButtonContainer}>
          <Icon name="pluscircleo" color="#00A2B4" size={70} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playerListContainer: {
    flex: 1,
    paddingTop: 103,
    paddingLeft: 204,
    backgroundColor: '#F7F7F7',

  },
  playerInfoHeadersTitle: {
    flexDirection: 'row',
    gap: 80,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 30,
  },
  playerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 75,
    marginVertical: 10,
  },
  input: {
    height: 84,
    width: 273,
    borderWidth: 2,
    padding: 5,
    paddingLeft: 17,
    borderRadius: 5,
    fontSize: 23,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
  playerNumberDisplay: {
    position: 'absolute',
    backgroundColor: '#F7F7F7',
    left: 20,
    bottom: 72,
    paddingLeft: 4,
    paddingRight: 5,
    fontSize: 17,
    color: '#00A2B4'
  },
  battingStyleWrapper: {
    flexDirection: 'row',
    marginRight: 30,
    gap: 25
  },
  battingStyleButton: {
    width: 50,
    height: 50,
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
    fontSize: 35,
    color: '#00A2B4',
    fontWeight: '700',
    width: 42,
    height: 42,
    borderWidth: 1,
    borderRadius: 46,
    borderColor: '#00A2B4',
    textAlign: 'center',
    lineHeight: 38,
  },
  playerIdContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 35,
  },
  playerIdText: {
    fontSize: 23,
    fontWeight: 400,
  },
  addButtonContainer: {
    width: 70,
    left: 110,
    bottom: 20,
  },
});

export default PlayerList;
