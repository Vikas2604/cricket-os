import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const PlayerInfoScreen = () => {
  const [players, setPlayers] = useState([{ id: 1, name: '', battingStyle: '' }]);

  const addPlayer = () => {
    setPlayers([...players, { id: Date.now(), name: '', battingStyle: '' }]);
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

  return (

    <View style={styles.playerInfoContainer}>
      <Text style={styles.playerInfoContainerHeader}>MATCH DETAILS</Text>
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
            <TouchableOpacity onPress={() => removePlayer(player.id)}>
              <Icon name="minuscircle" color="#F67676" size={30} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={addPlayer} style={styles.addButtonContainer}>
          <Icon name="pluscircleo" color="#00A2B4" size={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.numberOfPlayersContainer}>
          <Text style={styles.numberOfPlayersInfo}>Number of Players</Text>
          <Text style={styles.numberOfPlayers}>{players.length}</Text>
        </View>
        <View style={styles.backBtn}>
          <Icon
            name="arrowleft"
            color="#FFFFFF"
            size={43}
          />
          <Text style={styles.backBtnText}>Go Back</Text>
        </View>
        <View style={styles.continueBtn}>
          <Text style={styles.continueBtnText}>Continue</Text>
          <Icon name="arrowright" color="#FFFFFF" size={43} />
        </View>
      </View>
    </View>
  );
};

export default PlayerInfoScreen;

const styles = StyleSheet.create({
  playerInfoContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  playerInfoContainerHeader: {
    backgroundColor: "#00A3B4",
    color: "#fff",
    padding: 16,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  playerListContainer: {
    flex: 1,
    alignItems: 'center',

  },
  rightContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
  },
  numberOfPlayersContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 14,
    marginBottom: 20,
  },
  playerInfoHeadersTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  playerInfoHeadersText: {
    fontWeight: '600',
    fontSize: 18,
  },
  playerInfoHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    paddingVertical: 10,
  },
  playerInfoInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  battingStyleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    paddingRight: 100,
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
  addButtonContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: '26%',
  },
  numberOfPlayersInfo: {
    backgroundColor: '#00A2B4',
    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: 23,
    paddingVertical: 16,
    paddingHorizontal: 55,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  numberOfPlayers: {
    fontWeight: 700,
    fontSize: 73,
  },
  continueBtn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#00A2B4',
    alignItems: 'center',
    height: 84,
    width: 398,
    borderRadius: 96,
    justifyContent: 'center',
    gap: 10,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 500,
  },
  backBtn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#0000001A',
    alignItems: 'center',
    height: 84,
    width: 398,
    marginBottom: 30,
    borderRadius: 96,
    justifyContent: 'center',
    gap: 10
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 500,

  }
});
// Move Number of players, go back button & continue button to the right side of the screen move Enter Your Name, Batting Style & Player ID to the left side of the screen, Dont change anythign else in the code even the styles and header should remain the same.