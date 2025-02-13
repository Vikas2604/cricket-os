import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import PlayerList from '../../components/PlayerList';
import StyledButton from '../../components/StyledButton';



interface PlayerInfoScreenProps {
  setActiveTab: (tab: string) => void;
  players: Array<{ id: number; name: string; battingStyle: string; isOut: boolean }>;
  setPlayers: (players: Array<{ id: number; name: string; battingStyle: string; isOut: boolean }>) => void;
}

const PlayerInfoScreen: React.FC<PlayerInfoScreenProps> = ({ setActiveTab, players, setPlayers }) => {
  const generatePlayerId = () => {
    let id: number;
    do {
      id = Math.floor(100000 + Math.random() * 900000);
    } while (id === 1 || players.some(player => player.id === id));
    return id;
  };

  useEffect(() => {
    setPlayers(players.map(player => {
      if (player.id === 1) {
        return { ...player, id: generatePlayerId(), isOut: false };
      }
      return player;
    }));
  }, []);

  return (
    <View style={styles.playerInfoContainer}>
      <HeaderComponent title="Player Info" />
      <View style={styles.mainContainer}>
        <PlayerList players={players} setPlayers={setPlayers} allowEditing={true} />
        <View style={styles.verticalLine} />
        <View style={styles.rightContainer}>
          <View style={styles.numberOfPlayersInfoContainer}>
            <Text style={styles.numberOfPlayersInfo}>Number of Players</Text>
            <Text style={styles.numberOfPlayers}>{players.length}</Text>
          </View>

          <StyledButton
            text="Go Back"
            icon="arrowleft"
            onPress={() => { }}
            style={{ backgroundColor: '#000000', marginBottom: 24, marginRight: 40, }}
            textColor="#FFFFFF"
            iconColor="#FFFFFF"
            disabled={true}
          />

          <StyledButton
            text="Continue"
            icon="arrowright"
            onPress={() => setActiveTab("2")}
            style={{ backgroundColor: '#00A2B4', marginRight: 40 }}
            textColor="#FFFFFF"
            iconColor="#FFFFFF"
            iconStyle={{ position: 'absolute', right: 85, top: 20, color: "white" }}
          />
        </View>
      </View>
    </View>
  );
};

export default PlayerInfoScreen;

const styles = StyleSheet.create({
  playerInfoContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  rightContainer: {
    alignItems: 'center',
    marginRight: 80,
    marginTop: 100,
  },
  numberOfPlayersInfo: {
    backgroundColor: '#00A2B4',
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 23,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  numberOfPlayersInfoContainer: {
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 150,
    marginBottom: 157,
    marginRight: 40,
    width: 300,
    height: 200,
  },
  numberOfPlayers: {
    fontWeight: '700',
    fontSize: 73,
    textAlign: 'center',
    justifyContent: 'center',
    width: 300,
    height: 200,
  },
  arrowStyle: {
    // position: 'absolute'
  },
  verticalLine: {
    borderLeftWidth: 3,
    height: 600,
    top: 140,
    marginRight: 66,
  },
});

