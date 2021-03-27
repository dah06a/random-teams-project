import React, { Component } from 'react';
import { View, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, ListItem, Overlay, Input, CheckBox, Icon } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';

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
            fairScore: 0
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
        if (!data) return "No Data"; //If there is no data, function won't run
        if (data.length < numOfTeams) return "Not Enough People";  //Won't work if more teams than people

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
              return [teams, fairness];  //And then return everything!
            }
          }
        }
        return "No Teams Found";  //If teams cannot be created within a diff of 10, return 'No Teams Found'
    }

    render() {

        const currentTeams = this.makeTeams(this.state.selectedGroup, this.state.numOfTeams, this.state.evenTeams, this.state.thoroughness);


        const renderTeam = ({ item }) => {
            <View style={{width: 50, backgroundColor: '#fff'}}>
                <Text style={{color: 'black'}}>{item.name}</Text>
            </View>
        }

        console.log('#####!!!!!#####', currentTeams[0]);
        return (
            <View style={{flex: 1}}>

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
                                checked={this.state.evenTeams}
                                onPress={() => this.setState({evenTeams: !this.state.evenTeams})}
                            />

                        </View>
                    </TouchableWithoutFeedback>

                </Overlay>

                <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text>Team 1</Text>
                        <Text>{JSON.stringify(currentTeams[0][0])}</Text>
                    </View>

                    <View style={{flex: 1}}>
                        <Text>Team</Text>
                        <Text>{JSON.stringify(currentTeams[0][1])}</Text>
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
                            buttonStyle={{width: 150, height: '60%', backgroundColor: '#F4E7D2'}}
                            onPress={this.toggleOverlay}
                        />
                        <Button
                            title='Make Teams!'
                            type='outline'
                            titleStyle={{color: 'white'}}
                            buttonStyle={{width: 150, height: '60%', backgroundColor: '#476D6E'}}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
