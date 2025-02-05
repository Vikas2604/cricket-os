import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Player {
  id: number;
  name: string;
  battingStyle: string;
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
    setPlayers([...players, { id: generatePlayerId(), name: '', battingStyle: '' }]);
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
    // Ensure renderBall is not disabled
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
        <Text style={styles.headerText}>Player Name</Text>
        <Text style={styles.headerText}>Batting Style</Text>
        <Text style={styles.headerText}>Player ID</Text>
      </View>
      {players.map((player) => (
        <View key={player.id} style={styles.playerInfoRow}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => updatePlayerName(player.id, text)}
            value={player.name}
            placeholder="Enter Name"
            editable={allowEditing}
          />
          <BattingStyleSelector playerId={player.id} currentStyle={player.battingStyle} />
          <View style={styles.playerIdContent}>
            <Text>{player.id}</Text>
            {allowEditing && (
              <TouchableOpacity onPress={() => removePlayer(player.id)}>
                <Icon name="minuscircle" color="#F67676" size={30} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
      {allowEditing && (
        <TouchableOpacity onPress={addPlayer} style={styles.addButtonContainer}>
          <Icon name="pluscircleo" color="#00A2B4" size={40} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playerListContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
  },
  playerInfoHeadersTitle: {
    flexDirection: 'row',
    gap: 60,
    width: 940,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 700,
    fontSize: 30,
  },
  playerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 110,
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: 150,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  battingStyleWrapper: {
    flexDirection: 'row',
    marginRight: 20,
  },
  battingStyleButton: {
    width: 46,
    height: 46,
    marginHorizontal: 6,
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
    fontWeight: 700,
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
    gap: 10,
  },
  addButtonContainer: {
    marginTop: 10,
    marginLeft: 50,
    marginRight: 200,
  },
});

export default PlayerList;
