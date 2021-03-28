import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, ListItem, Overlay, Input, CheckBox, Icon, Divider } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';
import { fairnessMessage } from '../shared/fairnessMessage';

export default class Display extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedGroup: [],
            numOfTeams: 2,
            evenTeams: true,
            thoroughness: 1,
            overlayVisible: false,
            pickerVisable: false,

            createdTeams: [],
            fairScore: 0,
            error: ''
        }
    }

    componentDidMount() {
        this.setState({selectedGroup: this.props.route.params.selectedGroup});
    }

    toggleOverlay = () => {
        this.setState({overlayVisible: !this.state.overlayVisible});
    }

    makeTeams = (data, numOfTeams, evenTeams, thoroughness) => {

        //CHECK THE INPUT FOR ERRORS BEFORE STARTING
        if (!data) {
            this.setState({currentTeams: [], fairScore: 0, error: 'No Team Members'})
            return; //If there is no data, function won't run
        }
        if (data.length < numOfTeams) {
            this.setState({currentTeams: [], fairScore: 0, error: 'Not enough group members for this many teams'});
            return;  //Won't work if more teams than people
        }

        //SET THE OUTER LOOP AND DECLARE VARIABLES
        for (let teamDiff = 0; teamDiff <= 10; teamDiff++) {  //Outer loop to try diff lvls between teams
          let tempData = [...data];  //Create a temporary array from data
          let teams = [];  //Declare teams array
          for (let i = 0; i < numOfTeams; i++) teams.push([]);  //Create array for each team

          //TRY CREATING RANDOM TEAMS AND CHECKING HOW CLOSE THEY ARE
          for (let j = 0; j <= thoroughness*100; j++) {  //Try the following based on desired thoroughness

            //CREATE RANDOM, EVEN TEAMS
            if (evenTeams) { //If teams need to be even ...
              let whichTeam = 0; //Create a variable to iterate through each team
              while(tempData.length) {  //While there are still people in the temporary data ...
                let randomIndex = Math.floor(Math.random()*tempData.length);  //Pick a random index in the data
                let person = tempData.splice(randomIndex, 1)[0];  //Pick a random person using that index
                teams[whichTeam].push(person);  //Put person in a team and remove from temp
                whichTeam = (whichTeam === numOfTeams-1 ? 0 : whichTeam+1)  //Iterate to next team or back to first
              }

            //CREATE RANDOM TEAMS WITHOUT WORRYING ABOUT EVENNESS
            } else {  //Otherwise, if they don't need to be even
              while(tempData.length) {  //Go through a similar process
                let randomDataIndex = Math.floor(Math.random()*tempData.length);  //Pick a random index in the data
                let person = tempData.splice(randomDataIndex, 1)[0];  //Pick a random person using that index
                let randomTeam = Math.floor(Math.random()*teams.length);  //But now, pick a RANDOM team
                teams[randomTeam].push(person);  //And put that person in the team
              }
            }

            //FIND TEAM SCORES BASED ON PEOPLE IN EACH TEAM
            let teamScores = teams.map(team => {  //Find the 'score' of teams by going through each team
              let score = 0;  //Start their score at zero
              for (let k = 0; k < team.length; k++) {  //Go through each team member
                score += team[k].rank;  //And add their rank to the team score
              }
              return score;  //Return that team score to the 'score' array
            });

            //COMPARE EACH TEAM AND RETURN THE RESULTS IF GOOD ENOUGH
            let maxScore = Math.max(...teamScores);  //Find the highest team score
            let minScore = Math.min(...teamScores);  //Find the lowest team score
            let fairness = maxScore - minScore;
            if (fairness <= teamDiff) {  //If the team scores are within range
              //for (let l = 0; l < teams.length; l++) teams[l].push('Team Rank: ' + teamScores[l].toString());  //Add ranks
              this.setState({currentTeams: teams, fairScore: fairness, error: ''});  //And then return everything!
              return;
            }
          }
        }
        this.setState({currentTeams: [], fairScore: 0, error: 'No teams found.  Please try again.'})
        return;  //If teams cannot be created within a diff of 10, return 'No Teams Found'
    }

    render() {

        let team1Display = 'none';
        let team1Data = null;

        let team2Display = 'none';
        let team2Data = null;

        let team3Display = 'none';
        let team3Data = null;

        let team4Display = 'none';
        let team4Data = null;

        let team5Display = 'none';
        let team5Data = null;

        let team6Display = 'none';
        let team6Data = null;

        let teamDisplayHeights = '90%';

        let displayMessage = "Click 'Make Teams' to shuffle the teams!";

        if (this.state.currentTeams) {
            team1Display = 'flex';
            team1Data = this.state.currentTeams[0];

            team2Display = 'flex';
            team2Data = this.state.currentTeams[1];

            team3Display = this.state.currentTeams[2] ? 'flex' : 'none';
            team3Data = this.state.currentTeams[2] ? this.state.currentTeams[2] : null;

            team4Display = this.state.currentTeams[3] ? 'flex' : 'none';
            team4Data = this.state.currentTeams[3] ? this.state.currentTeams[3] : null;

            team5Display = this.state.currentTeams[4] ? 'flex' : 'none';
            team5Data = this.state.currentTeams[4] ? this.state.currentTeams[4] : null;

            team6Display = this.state.currentTeams[5] ? 'flex' : 'none';
            team6Data = this.state.currentTeams[5] ? this.state.currentTeams[5] : null;

            if (this.state.currentTeams.length > 2) teamDisplayHeights = '45%';
            if (this.state.currentTeams.length > 4) teamDisplayHeights = '30%';

            displayMessage = fairnessMessage(this.state.fairScore);
        }

        const renderTeam = ({ item }) => (
            <ListItem bottomDivider containerStyle={{backgroundColor: '#fff', width: '80%', alignSelf: 'center'}}>
                <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <ListItem.Title style={{fontSize: 14, marginLeft: 10, alignSelf: 'center'}}>{item.name}</ListItem.Title>
                    </View>
                </ListItem.Content>
            </ListItem>
        );

        return (
            <SafeAreaView style={{flex: 1}}>

                <Overlay
                    isVisible={this.state.overlayVisible}
                    onBackdropPress={this.toggleOverlay}
                    onTouchStart={Keyboard.dismiss}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{padding: 10, minHeight: 400, minWidth: 300}}>

                            <Text h2 style={{marginBottom: 20}}>Options</Text>

                            <Input
                                label='Number of Teams'
                                leftIcon={<Icon name='sitemap' type='font-awesome' color='#476D6E' style={{paddingRight: 10}} />}
                                value={this.state.numOfTeams.toString()}
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    this.setState({pickerVisable: true});
                                }}
                            />

                            <Picker
                                selectedValue={this.state.numOfTeams}
                                onValueChange={value => this.setState({numOfTeams: value, pickerVisable: false})}
                                style={{display: (this.state.pickerVisable ? 'flex' : 'none')}}
                            >
                                <Picker.Item label='2' value={2} />
                                <Picker.Item label='3' value={3} />
                                <Picker.Item label='4' value={4} />
                                <Picker.Item label='5' value={5} />
                                <Picker.Item label='6' value={6} />
                            </Picker>

                            <CheckBox
                                title={'Make Teams Even?'}
                                containerStyle={{marginBottom: 20}}
                                checked={this.state.evenTeams}
                                onPress={() => this.setState({evenTeams: !this.state.evenTeams})}
                            />

                            <View style={{flex: this.state.pickerVisable ? 0 : 1, justifyContent: this.state.pickerVisable ? 'flex-start' : 'flex-end'}}>

                            <Button
                                title='OK'
                                onPress={this.toggleOverlay}
                            />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>

                </Overlay>

                <View style={{flex: 6}}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', height: teamDisplayHeights}}>
                        <View style={{flex: 1, display: team1Display, backgroundColor: '#88D5D5', borderWidth: 1, borderColor: 'black'}}>
                            <Text h3 style={{alignSelf: 'center', marginBottom: 10}}>Team 1</Text>
                            <FlatList data={team1Data} renderItem={renderTeam} keyExtractor={item => item.id} />
                        </View>

                        <View style={{flex: 1, display: team2Display, backgroundColor: '#FCDDAF', borderWidth: 1, borderColor: 'black'}}>
                            <Text h3 style={{alignSelf: 'center', marginBottom: 10}}>Team 2</Text>
                            <FlatList data={team2Data} renderItem={renderTeam} keyExtractor={item => item.id} />
                        </View>
                    </View>

                    <View style={{display: team3Display, flexDirection: 'row', justifyContent: 'space-between', height: teamDisplayHeights}}>
                        <View style={{flex: 1, display: team3Display, backgroundColor: '#D0E5B9', borderWidth: 1, borderColor: 'black'}}>
                            <Text h3 style={{alignSelf: 'center', marginBottom: 10}}>Team 3</Text>
                            <FlatList data={team3Data} renderItem={renderTeam} keyExtractor={item => item.id} />
                        </View>

                        <View style={{flex: 1, display: team4Display, backgroundColor: '#E6D7F0', borderWidth: 1, borderColor: 'black'}}>
                            <Text h3 style={{alignSelf: 'center', marginBottom: 10}}>Team 4</Text>
                            <FlatList data={team4Data} renderItem={renderTeam} keyExtractor={item => item.id} />
                        </View>
                    </View>

                    <View style={{display: team5Display, flexDirection: 'row', justifyContent: 'space-between', height: teamDisplayHeights}}>
                        <View style={{flex: 1, display: team5Display, backgroundColor: '#FFF7F0', borderWidth: 1, borderColor: 'black'}}>
                            <Text h3 style={{alignSelf: 'center', marginBottom: 10}}>Team 5</Text>
                            <FlatList data={team5Data} renderItem={renderTeam} keyExtractor={item => item.id} />
                        </View>

                        <View style={{flex: 1, display: team6Display, backgroundColor: '#F7E37B', borderWidth: 1, borderColor: 'black'}}>
                            <Text h3 style={{alignSelf: 'center', marginBottom: 10}}>Team 6</Text>
                            <FlatList data={team6Data} renderItem={renderTeam} keyExtractor={item => item.id} />
                        </View>
                    </View>

                    <View style={{height: '10%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text h5>{displayMessage}</Text>
                    </View>
                </View>

                <View style={{flex: 1, backgroundColor: '#A9BFB8'}}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}>
                        <Button
                            title='Set Options'
                            type='outline'
                            titleStyle={{color: '#476D6E'}}
                            buttonStyle={{width: 150, backgroundColor: '#F4E7D2'}}
                            onPress={this.toggleOverlay}
                        />
                        <Button
                            title='Make Teams!'
                            type='outline'
                            titleStyle={{color: 'white'}}
                            buttonStyle={{width: 150, backgroundColor: '#476D6E'}}
                            onPress={() => this.makeTeams(this.state.selectedGroup, this.state.numOfTeams, this.state.evenTeams, this.state.thoroughness)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
