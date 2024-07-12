import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView, TextInput, Button } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';

const initialData = [
    { name: 'Team A', game: 'Football', result: 'Win' },
    { name: 'Team B', game: 'Football', result: 'Loss' },
    { name: 'Team C', game: 'Soccer', result: 'Win' },
    { name: 'Team D', game: 'Soccer', result: 'Loss' },
    { name: 'Team E', game: 'Basketball', result: 'Win' },
    { name: 'Team F', game: 'Basketball', result: 'Loss' },
    { name: 'Team G', game: 'Basketball', result: 'Win' },
    { name: 'Team H', game: 'Basketball', result: 'Loss' },
    { name: 'Team I', game: 'Basketball', result: 'Win' },
    { name: 'Team j', game: 'Football', result: 'Loss' },
    { name: 'Team k', game: 'Soccer', result: 'Win' },
    { name: 'Team l', game: 'Soccer', result: 'Loss' },
    { name: 'Team l', game: 'Lot', result: 'Win' },
];

const ScoreScreen = () => {
    const [teams, setTeams] = useState([]);
    const [tableData, setTableData] = useState([]); 

    const API = 'https://guide-plus.vercel.app'

    useEffect(() => {
        setTeams(initialData);
        generateSchedule(initialData);
    }, []);

    const generateSchedule = (teams) => {
        const schedule = teams.map(team => [team.name, team.game, team.result, 'Edit']);
        setTableData(schedule);
    };

    const handleEditResult = (index) => {
        const updatedTableData = [...tableData];
        const currentResult = updatedTableData[index][2];

        switch (currentResult) {
            case 'Win':
                updatedTableData[index][2] = 'Loss';
                break;
            case 'Loss':
                updatedTableData[index][2] = 'Draw';
                break;
            case 'Draw':
                updatedTableData[index][2] = 'Win';
                break;
            default:
                updatedTableData[index][2] = 'Win';
        }

        setTableData(updatedTableData);
    };

    const handleSave = () => {
        // Implement save functionality here
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    <Row
                        data={['Team', 'Game', 'Result', 'Edit']}
                        style={styles.head}
                        textStyle={styles.head_text}
                    />
                    {tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {rowData.map((cellData, cellIndex) => (
                                <Cell
                                    key={cellIndex}
                                    data={cellIndex === 3 ?
                                        <TouchableOpacity onPress={() => handleEditResult(index)}>
                                            <Text style={styles.editButton}>Edit</Text>
                                        </TouchableOpacity> :
                                        cellData}
                                    textStyle={styles.text}
                                />
                            ))}
                        </TableWrapper>
                    ))}
                </Table>
            </ScrollView>
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head_text: {
        margin: 6,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
    },
    head: { height: 50, backgroundColor: "#329acb", flexDirection: "row" },
    // head: { height: 40, backgroundColor: '#f1ffed', flexWrap: 'wrap' },
    text: { margin: 6, color: 'black' },
    row: { flexDirection: 'row', backgroundColor: '#FFFFFF', height: 40 },
    editButton: { color: 'blue', textAlign: 'center' },
});

export default ScoreScreen;
