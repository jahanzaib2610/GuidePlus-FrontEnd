import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';


export default function SportsAdmin({navigation}) {
  // for register modal
  const [isModalVisible, setModalVisible] = useState(false);
  // for register  team modal
  const [isTeamModalVisible, setTeamModalVisible] = useState(false);
  //pixer solo  reister
  const [selectedLanguage, setSelectedLanguage] = useState();
// pixer for team  register
  const [selectedSport, setSelectedSport] = useState();

  return (

    <View style={styles.container}>

      {/*Cards.........  */}
      <View style={styles.contentCards}>
        <View style={styles.cardSection}>
          <TouchableOpacity style={styles.card}  onPress={()=>navigation.navigate('Add_Games')}>
            <Image
              source={require("./sport_assets/games_admin.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Games</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Teams_Admin')}>
            <Image
              source={require("./sport_assets/teams.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Teams </Text>
          </TouchableOpacity>
        

          <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('Schedule')}>
            <Image
              source={require("./sport_assets/schedule_admin.png")}
              style={styles.icon}
            />
            <Text style={styles.icons_text}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Score')}>
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
                onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)
                }>
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
            <TextInput placeholder="Enter Team Name" style={styles.text_input} />
{/* piker                 */}
              <Picker
                selectedValue={selectedSport}
                onValueChange={(itemValue, itemIndex) => setSelectedSport(itemValue)
                }>
                <Picker.Item label="Select Sport" value="Select Sport" />
                <Picker.Item label="Cricket" value="Cricket" />
              </Picker>

              <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}>


                <TouchableOpacity style={styles.button} onPress={() => setTeamModalVisible(false)}>
                  <Text style={styles.button_text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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
// export default Sport_Admin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "lightblue",
    paddingTop: 100,
    // alignContent:'center'
    alignItems: 'center'
  },
  modelstyles: {
    // flex: 1 / 3,
    // paddingTop:2,
    paddingBottom: 10,
    width: 270,
    // hieght: 200,
    alignSelf: 'center',
    // backgroundColor: 'white',
    backgroundColor: '#f2f2f2',


  },
  contentCards: {
    // height: 550,
    flex: 1,
    //smoke
    backgroundColor: "#f2f2f2",
    paddingTop: 90,
  },
  cardSection: {
    // display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "flex-end",
    // paddingBottom:50
  },

  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "flex-end",
    margin: 8,
    // padding: 11,
    width: 160,
    height: 155,
    borderRadius: 15,
    //   white
    backgroundColor: "#fff",
    //smoke
    // backgroundColor:'#f2f2f2'
    // backgroundColor:'lightgrey'
  },
  icon: {
    width: 45,
    height: 45,
    padding: 38,
    // paddingBottom:3
    // borderRadius: 50,
  },
  icons_text: {
    // flexDirection:"row"
    // flex:1
    // padding:5,
    paddingTop: 15,
    fontSize: 18,
    // fontWeight:"bold",
  },

  text_input: {

    width: 230,
    height: 44,
    // backgroundColor: '#d1d1d1',
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
  },
  
});
