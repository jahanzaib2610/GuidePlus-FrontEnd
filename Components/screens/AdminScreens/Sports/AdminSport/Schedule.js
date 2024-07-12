import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TextInput, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';



const roundRobin = (teams) => {
    const schedule = [];
    const numTeams = teams.length;

    for (let round = 0; round < numTeams - 1; round++) {
        for (let match = 0; match < numTeams / 2; match++) {
            const homeIndex = (round + match) % (numTeams - 1);
            let awayIndex = (numTeams - 1 - match + round) % (numTeams - 1);

            if (match === 0) awayIndex = numTeams - 1;  // Fix last team as away

            const homeTeam = teams[homeIndex].teamName;
            const awayTeam = teams[awayIndex].teamName;
            const game = teams[homeIndex].game;

            schedule.push([homeTeam, awayTeam, game, ""]);
        }
    }

    console.log(schedule);
    return schedule;
};



const Schedule = () => {
    const [teams, setTeams] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedGame, setSelectedGame] = useState('');

    const API = 'https://guide-plus.vercel.app'

    useEffect(() => {

        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        let response = await fetch(`${API}/sports/fetchTeams`)
        response = await response.json();
        const teamNamesAndGames = response.map(({ teamName, game }) => ({ teamName, game }));
        // console.log(teamNamesAndGames);
        setTeams(teamNamesAndGames)
    }

    const handleGenerateSchedule = () => {
        const groupedTeams = teams.reduce((acc, team) => {
            if (!acc[team.game]) acc[team.game] = [];
            acc[team.game].push(team);
            return acc;
        }, {});

        const newSchedule = Object.values(groupedTeams).flatMap(gameTeams => {
            return roundRobin(gameTeams).map(match => [...match, ""]);
        });

        setTableData(newSchedule);

        // Update dropdown to contain only games present in the schedule
        setSelectedGame('');
    };

    const handleSaveSchedule = async() => {
        // Save schedule functionality
        const formattedData = tableData.map(row => {
            return {
                teamA: row[0],
                teamB: row[1],
                game: row[2],
                dateTime: row[3]
            };
        });
        console.log(formattedData);

        try {
            const response = await fetch(`${API}/sports/teamSchedule`, {
                method: 'POST',
                body: JSON.stringify(formattedData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                Alert.alert('Schedule Saved Successfully')
            } else {
                Alert.alert('Failed to Save Schedule');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
        // Alert.alert('Schedule Saved', 'The schedule has been saved.');
    };

    const handleSetDateTimeForGame = () => {
        if (!selectedGame) {
            Alert.alert('Error', 'Please select a game.');
            return;
        }
        setShowDatePicker(true);
    };


    const handleEditDateTime = (index) => {
        setSelectedMatchIndex(index);
        const currentTime = new Date().toLocaleString();
        const row = tableData[index];
        if (row && !row[3]) {
            const newData = [...tableData];
            newData[index][3] = currentTime;
            setTableData(newData);
        }
        setShowDatePicker(true);
    };



    const onDateChange = (selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleString();
            const newData = tableData.map(row => {
                if (row[2] === selectedGame) {
                    return [...row.slice(0, 3), formattedDate, ...row.slice(4)];
                }
                return row;
            });
            setTableData(newData);
        }
    };
    // const handleEditDateTime = (index) => {
    //   setShowDatePicker(true);
    //   setSelectedMatchIndex(index);
    // };

    // const onDateChange = (selectedDate) => {
    //   setShowDatePicker(false);
    //   if (selectedDate) {
    //       const formattedDate = selectedDate.toLocaleString();
    //       if (selectedMatchIndex !== null) {
    //           const newData = [...tableData];
    //           newData[selectedMatchIndex][3] = formattedDate;
    //           setTableData(newData);
    //           setSelectedMatchIndex(null);
    //       }
    //   }
    // };
    return (
        <View style={styles.container}>
            {tableData.length === 0 ? (
                <Button title="Create Schedule" onPress={handleGenerateSchedule} />
            ) : (
                <>
                    <View style={styles.controls}>
                        <Picker
                            selectedValue={selectedGame}
                            onValueChange={(itemValue) => setSelectedGame(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a Game" value="" />
                            {Array.from(new Set(teams.map(team => team.game))).map((game, index) => (
                                <Picker.Item key={index} label={game} value={game} />
                            ))}
                        </Picker>
                        <TouchableOpacity style={styles.button} onPress={handleSetDateTimeForGame} >
                            <Text style={styles.button_text}>
                                Set Date/Time
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {/* <Row
                                data={['Team A', 'Team B', 'Game', 'Date/Time', 'Edit']}
                                style={styles.head}
                                textStyle={styles.head_text}
                                
                            /> */}
                            <TableWrapper style={styles.head}>
                                {['Team A', 'Team B', 'Game', 'Date/Time', 'Edit'].map((cellData, cellIndex) => (
                                    <Cell
                                        key={cellIndex}
                                        data={cellData}
                                        textStyle={styles.head_text}
                                        //header third colmn 
                                        // style={cellIndex === 3 ? styles.thirdColumn : styles.column} // Apply style only to third column

                                        // style={cellIndex === 3 ? styles.thirdColumn : styles.column} // Apply style only to third column
                                        style={{ width: [80, 80, 81, 90, 50][cellIndex] }}

                                    />
                                ))}
                            </TableWrapper>

                            {tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {rowData.slice(0, -1).map((cellData, cellIndex) => (
                                        <Cell
                                            key={cellIndex}
                                            data={cellData}
                                            textStyle={styles.text}
                                            // edit length ad width for specific
                                            // style={cellIndex === 3 ? styles.thirdColumn : null}

                                            style={{ width: [80, 80, 81, 90, 50][cellIndex] }}
                                        />
                                    ))}
                                    <Cell
                                        data={
                                            <TouchableOpacity onPress={() => handleEditDateTime(index)}>
                                                <Text style={styles.editButton}>Edit</Text>
                                            </TouchableOpacity>
                                        }
                                        textStyle={styles.text}
                                    />
                                </TableWrapper>
                            ))}
                        </Table>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSaveSchedule} >
                            <Text style={styles.button_text}>
                                Save
                            </Text>
                        </TouchableOpacity>
                        {/* <Button title="Save" onPress={handleSaveSchedule} /> */}
                    </View>
                </>
            )}
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="datetime"
                onConfirm={onDateChange}
                onCancel={() => setShowDatePicker(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    controls: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' },
    picker: { height: 50, width: 150 },
    // head: { height: 44, backgroundColor: '#329acb', flexWrap: 'wrap', aligh: 'center' },
    head: { height: 40, backgroundColor: '#329acb', flexDirection: 'row', },
    text: { margin: 6, color: 'black', fontSize: 13.5, },
    head_text: { margin: 6, color: 'white', fontWeight: "bold", alignSelf: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFFFFF', height: 44, },
    buttonContainer: { marginTop: 20, BorderRadius: 10, },
    editButton: { color: 'blue', textAlign: 'center', },
    button: {
        //flex can be removed 
        display: 'flex',
        // width: 96,
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#329acb',
        justifyContent: "center",
        alignItems: "center",
        //space in buttons
        margin: 7,

    },
    button_text: {
        color: "white", fontStyle: "normal", fontSize: 17
    },
    thirdColumn: {
        width: 100,  // Specify the width for the third column
    },
    // column: {
    //     // width: 100, // Default width for other columns
    // },    
});

export default Schedule;
