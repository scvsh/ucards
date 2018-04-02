import React, {Component} from 'react';
import {
    ListItem,
    CheckBox,
    Button,
    InputGroup,
    Input,
    Container,
    Header,
    Icon,
    Content,
    Card,
    CardItem,
    Body,
    H1,
    H2,
    H3,
    Text,
} from 'native-base';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {addNewDeckTitle} from '../utils/api';
import {NavigationActions} from 'react-navigation';
import {white, purple, pink, gray, black} from '../utils/colors';

class AddDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        };
    }

    createNewDeck = () => {
        return addNewDeckTitle(this.state.inputText).then(
            this.navigateToDeck(this.state.inputText),
        );
    };

    navigateToDeck = item => {
        const {navigate, dispatch} = this.props.navigation;

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'MainView',
                    params: {item},
                }),
            ],
        });
        dispatch(resetAction);
        navigate('Deck', {item});
    };

    render() {
        const {inputText} = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <Container>
                        <Content>
                            <Body style={{alignItems: 'center'}}>
                                <Text
                                    style={{
                                        marginBottom: '5%',
                                        marginTop: '10%',
                                    }}>
                                    Enter the deck title:
                                </Text>
                                <InputGroup
                                    style={{marginBottom: '10%'}}
                                    borderType="underline">
                                    <Input
                                        style={{width: '100%'}}
                                        onChangeText={inputText =>
                                            this.setState({
                                                inputText,
                                            })
                                        }
                                        value={inputText}
                                        placeholder={'Input title'}
                                    />
                                </InputGroup>
                                <Button block dark onPress={this.createNewDeck}>
                                    <Text>Create Deck</Text>
                                </Button>
                            </Body>
                        </Content>
                    </Container>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddDeck;
