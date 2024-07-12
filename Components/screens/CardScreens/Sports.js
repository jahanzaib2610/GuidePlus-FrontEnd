import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


function Sports({ navigation }) {
  // for register modal
  const [isModalVisible, setModalVisible] = useState(false);
  // for register  team modal
  const [isTeamModalVisible, setTeamModalVisible] = useState(false);
  //pixer solo  reister
  const [selectedLanguage, setSelectedLanguage] = useState();
  // pixer for team  register
  const [game, setGame] = useState('');
  const [allGames, setAllGames] = useState([])
  const [captName, setCaptName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [department, setDepartment] = useState('');
  const [limit, setLimit] = useState('')

  const API = 'https://guide-plus.vercel.app'

  useEffect(() => {
    getDetails()
    fetchGames()
  }, [department, captName])

  const getDetails = async () => {
    const name = await AsyncStorage.getItem('name')
    const dept = await AsyncStorage.getItem('department')
    setCaptName(name)
    setDepartment(dept)
    console.log(department + captName);
    // console.log(name, dept);
  }

  // Fetching All Games
  const fetchGames = async () => {
    let response = await fetch(`${API}/sports/allGames`)
    response = await response.json()
    console.log(response);
    setAllGames(response)
    // setTableData(response)
  }

  // fetching limit for games
  const handleGameChange = async (id) => {
    console.log(id);


    if (id !== 'Select Sport') {
      let response = await fetch(`${API}/sports/fetchGames/${id}`);
      response = await response.json();
      setLimit(response.limit);
      console.log(limit);
    } else {
      setLimit('');
    }
  }


  // team register handler
  const handleRegister = async () => {
    console.log(teamName, game, captName, department, limit);
    let response = await fetch(`${API}/sports/registerTeams`, {
      method: 'post',
      body: JSON.stringify({ teamName, captName, game, department, limit }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      let data = await response.json()
      Alert.alert(data.message)
    } else {
      let errorData = await response.json()
      Alert.alert(errorData.error, 'Try Using Another Name')
    }
    setTeamModalVisible(false)
    setGame('')
    setTeamName('')
  }
  const handleCancelPress = () => {
    setTeamModalVisible(false)
    setGame('')
    setTeamName('')
  }

  return (

    <View style={styles.container}>

      {/*Cards.........  */}
      <View style={styles.contentCards}>
        <View style={styles.cardSection}>
          <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
            <Image
              source={require("./sport_assets/add.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => setTeamModalVisible(true)}>
            <Image
              source={require("./sport_assets/teams.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Register Team </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.card}>
            <Image
              source={require("./sport_assets/team2.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Teams</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentSchedule')}>
            <Image
              source={require("./sport_assets/schedule.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={require("./sport_assets/games.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Games</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image
              source={require("./sport_assets/score.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Score</Text>
          </TouchableOpacity>

        </View>

        {/* </View> */}
      </View>

      {/* Cards end */}


      {/* Register solo  start  */}
      <Modal visible={isModalVisible}
        transparent={true}
      //  style={{height:100,width:200}}

      >
        <View style={styles.modelstyles}>

          <View style={{ paddingTop: 26, paddingBottom: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
              >
                {/* piker                 */}
                <Picker.Item label="Select Sport" value="Select Sport" />
                <Picker.Item label="Swimming" value="Cricket" />
              </Picker>

              <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}>


                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                  <Text style={styles.button_text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.button_text}>Save</Text>

                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* enroll solo  model ends */}

      {/* register teams model  */}
      <Modal visible={isTeamModalVisible} transparent={true}      >
        <View style={styles.modelstyles}>

          <View style={{ paddingTop: 26, paddingBottom: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
              <TextInput placeholder="Enter Team Name" value={teamName} onChangeText={setTeamName} style={styles.text_input} />
              {/* piker                 */}
              <Picker
                selectedValue={game}
                onValueChange={(itemValue, itemIndex) => {
                  setGame(itemValue)
                  // console.log(allGames[itemIndex-1]._id);
                  if (itemIndex > 0) {
                    handleGameChange(allGames[itemIndex - 1]._id);
                  } else {
                    handleGameChange('Select Sport');
                  }
                  // handleGameChange(allGames[itemIndex-1]._id);

                }
                }>
                <Picker.Item label="Select Sport" value="Select Sport" />
                {/* <Picker.Item label="Cricket" value="Cricket" /> */}
                {allGames.map((Item) => (
                  <Picker.Item key={Item._id} label={Item.game} value={Item.game} />
                ))}
              </Picker>
              <TextInput style={styles.text_input} value={limit ? 'Team Limit: ' + limit : 'Team Limit'} editable={false} />

              <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}>


                <TouchableOpacity style={styles.button} onPress={handleCancelPress}>
                  <Text style={styles.button_text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                  <Text style={styles.button_text}>Register</Text>

                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
}
export default Sports;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "lightblue",
    // paddingTop: '20',
    // alignContent:'center'
    alignItems: 'center',
    justifyContent: 'center'
  },
  modelstyles: {

    paddingBottom: 10,
    width: 270,
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',


  },

  cardSection: {
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    margin: 8,
    width: 160,
    height: 155,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  icon: {
    width: 45,
    height: 45,
    padding: 38,
  },
  icons_text: {

    paddingTop: 15,
    fontSize: 18,
  },

  text_input: {

    width: 230,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#d1d1d1',
    // borderWidth: 0.8,
    borderRadius: 8,
    fontSize: 17,
    borderBottomWidth: 1.1,

  }
  ,
  button: {
    display: 'flex',
    width: 100,
    height: 42,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#329acb',
    justifyContent: "center",
    alignItems: "center",
    //space in buttons
    margin: 8,

  },
  button_text: {
    color: "white", fontStyle: "normal", fontSize: 17
  }
});
