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
      <ScrollView showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <View key={player.id} style={styles.playerInfoRow}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => updatePlayerName(player.id, text)}
              value={player.name}
              placeholder="Enter Name"
              editable={allowEditing}
            />
            <Text style={styles.playerNumberDisplay}>Player {index + 1}</Text>

            <BattingStyleSelector playerId={player.id} currentStyle={player.battingStyle} />
            <View style={styles.playerIdContent}>
              <Text style={styles.playerIdText}>{player.id}</Text>
              {allowEditing && (
                <TouchableOpacity onPress={() => removePlayer(player.id)}>
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
    paddingLeft: 150,
    backgroundColor: '#F7F7F7',

  },
  playerInfoHeadersTitle: {
    flexDirection: 'row',
    gap: 80,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 20,
  },
  playerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 65,
    marginVertical: 10,
  },
  input: {
    height: 54,
    width: 173,
    borderWidth: 2,
    // padding: 5,
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
    fontWeight: 400,
  },
  addButtonContainer: {
    width: 50,
    left: 40,
    bottom: 20,
  },
});

export default PlayerList;
