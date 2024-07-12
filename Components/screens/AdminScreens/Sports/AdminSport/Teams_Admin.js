import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity,
    Text,
    TextInput,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

const AdminTeamView = () => {
    const [allTeams, setAllTeams] = useState([]);
    const [searchText, setSearchText] = useState("");

    const API = 'https://guide-plus.vercel.app'

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            let data = await fetch(`${API}/sports/allTeams`);
            data = await data.json();
            console.log(data);
            setAllTeams(data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    const tableHead = ["Team", "Game", "Dep", "Limit", "Actions"];

    const deleteTeam = async(teamName) => {
        console.log(teamName);
        let response = await fetch(`${API}/sports/deleteTeam/${teamName}`,{
            method:'DELETE',
        })
        response = await response.json()
        if(response.deletedCount > 0){
            Alert.alert('Team Deleted Successfully!')
        }
        else{
            Alert.alert('Failed to Delete Team')
        }
        fetchTeams();
    };

    const saveChanges = () => {
        Alert.alert("Changes Saved", "Changes have been saved successfully.");
    };

    const renderRow = (rowData, index) => {
        return [
            rowData.teamName,
            rowData.game,
            rowData.department,
            rowData.limit.toString(),
            <TouchableOpacity
                key={`delete-${index}`}
                onPress={() => deleteTeam(rowData.teamName)}
            >
                <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>,
        ];
    };

    const filteredData = allTeams.filter((team) =>
        Object.values(team).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <View style={styles.container}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingBottom: 10,
                }}
            >
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Image
                        source={require("../sport_assets/locator.png")}
                        style={{ width: 48, height: 48 }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                    <TableWrapper style={styles.head}>
                        {tableHead.map((cellData, cellIndex) => (
                            <Cell
                                key={cellIndex}
                                data={cellData}
                                textStyle={styles.head_text}
                                style={{ width: [90, 90, 90, 47, 80][cellIndex] }}
                            />
                        ))}
                    </TableWrapper>
                    {filteredData.map((team, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {renderRow(team, index).map((cellData, cellIndex) => (
                                <Cell
                                    key={cellIndex}
                                    data={cellData}
                                    textStyle={cellIndex === 3 ? styles.Limit_text : styles.text}
                                    style={{ width: [90, 90, 90, 47, 80][cellIndex] }}
                                />
                            ))}
                        </TableWrapper>
                    ))}
                </Table>
            </ScrollView>

            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={saveChanges}>
                    <Text style={styles.button_text}>Save</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, paddingTop: 10, backgroundColor: "#fff" },
    searchBar: {
        width: 180,
        height: 44,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#329acb",
        borderRadius: 10,
        fontSize: 18,
        borderBottomWidth: 1,
    },
    head_text: {
        margin: 6,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
    },
    head: { height: 50, backgroundColor: "#329acb", flexDirection: "row" },
    text: { margin: 6, color: "black" },
    Limit_text: { margin: 6, color: "black", alignSelf: "center" },
    row: { flexDirection: "row", backgroundColor: "#FFFFFF", height: 40 },
    buttonContainer: { marginTop: 20, borderRadius: 10 },
    deleteButton: { color: "red", textAlign: "center" },
    searchButton: {
        width: 48,
        height: 48,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        display: "flex",
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: "#329acb",
        justifyContent: "center",
        alignItems: "center",
        margin: 7,
    },
    button_text: {
        color: "white",
        fontSize: 17,
    },
    column: {
        width: 100, // Default width for other columns
    },
    specialColumn: {
        width: 150, // Specify the width for the third and fourth columns
    },
});

export default AdminTeamView;
