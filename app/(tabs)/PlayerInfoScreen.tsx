import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import PlayerList from '../../components/PlayerList';
import StyledButton from '../../components/StyledButton';

const { width, height } = Dimensions.get('window'); // Get device's screen dimensions

interface PlayerInfoScreenProps {
  setActiveTab: (tab: string) => void;
  players: Array<{ phoneNumber: string; name: string; battingStyle: string; isOut: boolean }>;
  setPlayers: (players: Array<{ phoneNumber: string; name: string; battingStyle: string; isOut: boolean }>) => void;
}

const PlayerInfoScreen: React.FC<PlayerInfoScreenProps> = ({ setActiveTab, players, setPlayers }) => {
  const generatePhoneNumber = () => {
    let phoneNumber: string;
    do {
      const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
      phoneNumber = `+91${randomNum}`;
    } while (players.some(player => player.phoneNumber === phoneNumber));
    return phoneNumber;
  };

  useEffect(() => {
    setPlayers(players.map(player => {
      if (!player.phoneNumber) {
        return { ...player, phoneNumber: generatePhoneNumber(), isOut: false };
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
            style={styles.goBackButton}
            textColor="#FFFFFF"
            iconColor="#FFFFFF"
            disabled={true}
          />

          <StyledButton
            text="Continue"
            icon="arrowright"
            onPress={() => setActiveTab("2")}
            style={styles.continueButton}
            textColor="#FFFFFF"
            iconColor="#FFFFFF"
            iconStyle={styles.iconStyle}
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
    width: width * 1, // Ensure the container doesn't exceed the screen width
    // borderWidth: 1,
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  rightContainer: {
    alignItems: 'center',
    marginTop: height * 0.1, // Adjust margin based on screen height
  },
  numberOfPlayersInfo: {
    backgroundColor: '#00A2B4',
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: width > 400 ? 16 : 13, // Adjust font size for larger/smaller screens
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  numberOfPlayersInfoContainer: {
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: height * 0.1, // Percentage-based margin for responsiveness
    marginRight: 40,
    height: 150,
  },
  numberOfPlayers: {
    fontWeight: '700',
    fontSize: width > 400 ? 73 : 60, // Adjust font size based on screen width
    textAlign: 'center',
    justifyContent: 'center',
    width: 200,
    height: 100,
  },
  verticalLine: {
    position: 'absolute',
    borderLeftWidth: 3,
    height: height * 0.5, // Make the line height relative to screen height
    top: height * 0.1, // Adjust top position based on screen height
    right: 320,
  },
  goBackButton: {
    backgroundColor: '#000000',
    marginBottom: 24,
    marginRight: 40,
  },
  continueButton: {
    backgroundColor: '#00A2B4',
    marginRight: 40,
  },
  iconStyle: {
    position: 'absolute',
    right: 30,
    top: 15,
    color: 'white',
  },
});
