import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderComponent from '../../components/HeaderComponent'; // Importing HeaderComponent

interface PlayerInfoScreenProps {
  setActiveTab: (tab: string) => void;
  players: Array<{ id: number; name: string; battingStyle: string }>;
  setPlayers: (players: Array<{ id: number; name: string; battingStyle: string }>) => void;
}

const PlayerInfoScreen: React.FC<PlayerInfoScreenProps> = ({ setActiveTab, players, setPlayers }) => {
  const generatePlayerId = () => {
    let id: number; // Explicitly declare id as a number
    do {
      id = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
    } while (id === 1 || players.some(player => player.id === id)); // Ensure uniqueness and that id is not 1
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

  useEffect(() => {
    // Ensure that the player IDs are not 1 when the component mounts
    setPlayers(players.map(player => {
      if (player.id === 1) {
        return { ...player, id: generatePlayerId() }; // Regenerate ID if it's 1
      }
      return player;
    }));
  }, []);

  return (
    <View style={styles.playerInfoContainer}>
      <HeaderComponent title="Player Info" /> {/* Adding HeaderComponent */}

      <View style={styles.mainContainer}>
        {/* Left section for player details */}

        <View style={styles.playerListContainer}>
          <View style={styles.playerInfoHeadersTitle}>
            <Text style={styles.playerInfoHeadersText}>Enter Your Name</Text>
            <Text style={styles.playerInfoHeadersText}>Batting Style</Text>
            <Text style={styles.playerInfoHeadersText}>Player ID</Text>
          </View>
          {players.map((player) => (
            <View key={player.id} style={styles.playerInfoHeaders}>
              <TextInput
                style={styles.playerInfoInput}
                onChangeText={(text) => updatePlayerName(player.id, text)}
                value={player.name}
                placeholder="Player Name"
              />
              <View style={styles.battingStyleContainer}>
                <TouchableOpacity
                  style={[styles.battingButton, player.battingStyle === 'L' && styles.activeButton]}
                  onPress={() => updateBattingStyle(player.id, 'L')}
                >
                  <Text style={styles.battingButtonText}>L</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.battingButton, player.battingStyle === 'R' && styles.activeButton]}
                  onPress={() => updateBattingStyle(player.id, 'R')}
                >
                  <Text style={styles.battingButtonText}>R</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.playerIdContent} >
                <Text>{player.id}</Text> {/* Display Player ID */}
                <TouchableOpacity onPress={() => removePlayer(player.id)}>
                  <Icon name="minuscircle" color="#F67676" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={addPlayer} style={styles.addButtonContainer}>
            <Icon name="pluscircleo" color="#00A2B4" size={40} />
          </TouchableOpacity>
        </View>

        <View style={styles.verticalLine}></View>
        {/* Right section for number of players and buttons */}
        <View style={styles.rightContainer}>
          <View style={styles.numberOfPlayersInfoContainer}>
            <Text style={styles.numberOfPlayersInfo}>Number of Players</Text>
            <Text style={styles.numberOfPlayers}>{players.length}</Text>
          </View>
          <TouchableOpacity style={styles.backBtn} disabled>
            <Icon
              name="arrowleft"
              color="#FFFFFF"
              size={43}
            />
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={() => setActiveTab("2")}>
            <Text style={styles.continueBtnText}>Continue</Text>
            <Icon name="arrowright" color="#FFFFFF" size={43} />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};

export default PlayerInfoScreen;

const styles = StyleSheet.create({
  playerInfoContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  playerListContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 20,
    overflowY: 'auto',

  },
  rightContainer: {
    alignItems: 'center',
    marginLeft: 'auto',
    paddingTop: 100,
  },
  playerInfoHeadersTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  playerInfoHeadersText: {
    fontWeight: 700,
    fontSize: 24,
    marginTop: 30,
    marginLeft: 10,
  },
  playerInfoHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    marginLeft: 10,
  },
  playerInfoInput: {
    height: 40,
    width: 150,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  battingStyleContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  },
  battingButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6ABBC4',
    color: '#6ABBC4',
  },
  activeButton: {
    backgroundColor: '#00A2B4',
    color: '#F7F7F7',
  },
  battingButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerIdContent: {
    fontSize: 24,
    fontWeight: 400,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  addButtonContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 70,
  },
  numberOfPlayersInfo: {
    backgroundColor: '#00A2B4',
    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: 23,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  numberOfPlayersInfoContainer: {
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 30,
    marginRight: 40,
  },
  numberOfPlayers: {
    fontWeight: 700,
    fontSize: 73,
    textAlign: 'center',
    paddingBottom: 30,
  },
  continueBtn: {
    flexDirection: 'row',
    backgroundColor: '#00A2B4',
    alignItems: 'center',
    height: 64,
    width: 300,
    borderRadius: 96,
    justifyContent: 'center',
    gap: 10,
    marginRight: 40,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 500,
  },
  backBtn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'center',
    height: 64,
    width: 300,
    marginBottom: 30,
    borderRadius: 96,
    justifyContent: 'center',
    gap: 10,
    opacity: 0.5,
    marginRight: 40,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 500,
  },
  verticalLine: {
    borderLeftWidth: 3,
    height: 600,
    marginTop: 20,
    paddingRight: 20,
  }
});
