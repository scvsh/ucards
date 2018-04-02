import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Platform, Animated} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {addNewCardToDeck} from '../utils/api';
import {white, purple, pink, orange, blue, gray, black} from '../utils/colors';
import {
    Icon,
    InputGroup,
    Input,
    Button,
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    H1,
    H2,
    H3,
    Text,
} from 'native-base';

class AddNewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            title: '',
            opacity: new Animated.Value(0),
        };
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: <H1>New Card</H1>,
    });

    componentDidMount() {
        const {opacity} = this.state;

        this.setState(() => ({title: this.props.navigation.state.params.item}));
        Animated.timing(opacity, {toValue: 1, duration: 800}).start();
    }

    addNewCard = title => {
        const content = {
            question: this.state.question,
            answer: this.state.answer,
        };
        return addNewCardToDeck(title, content).then(() =>
            this.returnToDeckItem(this.state.title, content),
        );
    };

    returnToDeckItem = (item, content) => {
        const {navigate, dispatch} = this.props.navigation;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MainView'})],
        });
        dispatch(resetAction);
        navigate('DeckItem', {item});
    };

    render() {
        const {opacity} = this.state;

        return (
            <Animated.View style={[styles.container, {opacity}]}>
                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body style={{alignItems: 'center'}}>
                                    <Content padder>
                                        <Text
                                            style={{
                                                marginBottom: '5%',
                                                marginTop: '10%',
                                            }}>
                                            Enter you question:
                                        </Text>
                                        <InputGroup
                                            style={{marginBottom: '10%'}}
                                            borderType="underline">
                                            <Icon
                                                name="md-help"
                                                style={{color: black}}
                                            />
                                            <Input
                                                onChangeText={question =>
                                                    this.setState({question})
                                                }
                                                value={this.state.question}
                                                placeholder="Your question"
                                            />
                                        </InputGroup>
                                        <Text style={{paddingBottom: '5%'}}>
                                            Enter you answer:
                                        </Text>
                                        <InputGroup
                                            style={{
                                                marginBottom: '10%',
                                                minWidth: '100%',
                                            }}
                                            borderType="underline">
                                            <Icon
                                                name="ios-text"
                                                style={{color: black}}
                                            />
                                            <Input
                                                onChangeText={answer =>
                                                    this.setState({answer})
                                                }
                                                value={this.state.answer}
                                                placeholder="Your answer"
                                            />
                                        </InputGroup>

                                        <Button
                                            onPress={() =>
                                                this.addNewCard(
                                                    this.props.navigation.state
                                                        .params.item,
                                                )
                                            }
                                            block
                                            dark>
                                            <Text>Submit</Text>
                                        </Button>
                                    </Content>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    addBtn: {
        backgroundColor: blue,
        marginLeft: 40,
        marginRight: 40,
    },
});

export default AddNewCard;
