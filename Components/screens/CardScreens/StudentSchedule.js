import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';

const StudentSchedule = () => {
    const [teams, setTeams] = useState([]);
    const [tableData, setTableData] = useState([]);

    const API = 'https://guide-plus.vercel.app'

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        let response = await fetch(`${API}/sports/allSchedules`);
        response = await response.json();
        const formattedTeams = response.map(({ teamA, teamB, game, dateTime }) => [teamA, teamB, game, dateTime]);
        setTeams(formattedTeams);
        setTableData(formattedTeams);
    };

    return (
        <View style={styles.container}>
            {tableData.length === 0 ? (
                <Button title="Fetch Schedule" onPress={fetchTeams} />
            ) : (
                <>
                    <ScrollView>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <TableWrapper style={styles.head}>
                                {['Team A', 'Team B', 'Game', 'Date/Time'].map((cellData, cellIndex) => (
                                    <Cell
                                        key={cellIndex}
                                        data={cellData}
                                        textStyle={styles.head_text}
                                        // style={{ width: [80, 80, 81, 120][cellIndex] }}
                                    />
                                ))}
                            </TableWrapper>

                            {tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {rowData.map((cellData, cellIndex) => (
                                        <Cell
                                            key={cellIndex}
                                            data={cellData}
                                            textStyle={styles.text}
                                            // style={{ width: [80, 80, 81, 120][cellIndex] }}
                                        />
                                    ))}
                                </TableWrapper>
                            ))}
                        </Table>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#329acb', flexDirection: 'row' },
    text: { margin: 6, color: 'black', fontSize: 13.5 },
    head_text: { margin: 6, color: 'white', fontWeight: "bold", alignSelf: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFFFFF', height: 44 },
});

export default StudentSchedule;
