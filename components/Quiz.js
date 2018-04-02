import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Animated} from 'react-native';
import {getDeck} from '../utils/api';
import {setLocalNotification, clearLocalNotification} from '../utils/helpers';
import {NavigationActions} from 'react-navigation';
import {
    black,
    white,
    purple,
    green,
    red,
    blue,
    pink,
    orange,
} from '../utils/colors';
import {
    ListItem,
    CheckBox,
    Button,
    InputGroup,
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

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: {
                questions: [
                    {
                        question: '',
                        answer: '',
                    },
                ],
            },
            toggleAnswer: false,
            cardCurrentNumber: 0,
            counter: 0,
            endOfQuiz: false,
            opacity: new Animated.Value(0),
        };
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: <H1>Quiz!</H1>,
    });

    componentDidMount() {
        const {opacity} = this.state;

        getDeck(this.props.navigation.state.params.item)
            .then(results => this.setState(() => ({deck: results})))
            .then(() =>
                Animated.timing(opacity, {toValue: 1, duration: 800}).start(),
            );
    }

    backHome = item => {
        const {navigate} = this.props.navigation;
        return navigate('MainView');
    };

    quizNextCard = (cardCurrentNumber, deck) => {
        this.setState({toggleAnswer: false});
        cardCurrentNumber++;

        if (cardCurrentNumber < deck.questions.length) {
            this.setState(() => ({cardCurrentNumber: cardCurrentNumber}));
        } else {
            this.setState(() => ({endOfQuiz: true}));
            clearLocalNotification().then(setLocalNotification);
        }
    };

    flipCardSide = toggleAnswer =>
        this.setState(() => ({toggleAnswer: !toggleAnswer}));

    restartQuiz = () => {
        this.setState(() => ({
            endOfQuiz: false,
            counter: 0,
            cardCurrentNumber: 0,
        }));
    };

    incrementQuestionCounter = (cardCurrentNumber, deck) => {
        this.setState(() => ({counter: this.state.counter + 1}));
        this.quizNextCard(cardCurrentNumber, deck);
    };

    render() {
        const {
            deck,
            toggleAnswer,
            cardCurrentNumber,
            endOfQuiz,
            counter,
            opacity,
        } = this.state;

        return endOfQuiz ? (
            <Animated.View style={[styles.container, {opacity}]}>
                <Container>
                    <Content>
                        <ListItem>
                            <Body>
                                <Card
                                    style={{
                                        height: 100,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '5%',
                                    }}>
                                    <CardItem>
                                        <H1>
                                            You've scored{' '}
                                            {`${parseFloat(
                                                (
                                                    counter /
                                                    deck.questions.length *
                                                    100
                                                ).toFixed(2),
                                            )}%`}
                                        </H1>
                                    </CardItem>
                                </Card>
                                <Text style={{textAlign: 'center'}}>
                                    {counter / deck.questions.length * 100 >= 75
                                        ? 'Great work! Fruit company has called to offer you a job.'
                                        : 'A cat in gloves catches no mice.'}
                                </Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Button
                                    style={{marginBottom: '3%'}}
                                    block
                                    onPress={() => this.backHome(deck.title)}
                                    dark>
                                    <Text>To My Decks</Text>
                                </Button>
                                <Button
                                    block
                                    onPress={() => this.restartQuiz()}
                                    dark
                                    bordered>
                                    <Text>Quiz again</Text>
                                </Button>
                            </Body>
                        </ListItem>
                    </Content>
                </Container>
            </Animated.View>
        ) : (
            <Animated.View style={[styles.container, {opacity}]}>
                <Container>
                    <Content>
                        <ListItem
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={styles.displayCounter}>
                                {`${cardCurrentNumber + 1} of ${
                                    deck.questions.length
                                }`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <H1>
                                            {toggleAnswer
                                                ? deck.questions[
                                                      cardCurrentNumber
                                                  ].answer
                                                : deck.questions[
                                                      cardCurrentNumber
                                                  ].question}
                                        </H1>
                                    </Body>
                                </CardItem>
                            </Card>
                        </ListItem>
                        <ListItem>
                            <Button
                                block
                                key="1"
                                onPress={() =>
                                    this.incrementQuestionCounter(
                                        cardCurrentNumber,
                                        deck,
                                    )
                                }
                                style={{margin: '2%', flex: 1}}
                                dark>
                                <Text>I know it!</Text>
                            </Button>
                            <Button
                                block
                                key="2"
                                style={{margin: '2%', flex: 1}}
                                dark
                                onPress={() =>
                                    this.quizNextCard(cardCurrentNumber, deck)
                                }
                                bordered>
                                <Text>Need to repeat</Text>
                            </Button>
                        </ListItem>
                        <ListItem
                            onPress={() => this.flipCardSide(toggleAnswer)}>
                            <CheckBox color={black} checked={toggleAnswer} />
                            <Body>
                                <Text>Show me the answer</Text>
                            </Body>
                        </ListItem>
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
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: orange,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    displayCounter: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.5,
    },
    cardBox: {
        backgroundColor: white,
        justifyContent: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#dddae2',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.7,
    },
    cardContent: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scoreBox: {
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    scoreContent: {
        fontSize: 26,
        fontWeight: 'bold',
        color: red,
        textAlign: 'center',
    },
    scoreMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: purple,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    optionsBox: {
        marginTop: 40,
        marginBottom: 40,
    },
    goBackBtn: {
        backgroundColor: blue,
        marginLeft: 40,
        marginRight: 40,
    },
    restartBtn: {
        backgroundColor: orange,
        marginLeft: 40,
        marginRight: 40,
    },
    toggleBtn: {
        backgroundColor: purple,
        marginLeft: 40,
        marginRight: 40,
    },
    correctBtn: {
        backgroundColor: green,
        marginLeft: 40,
        marginRight: 40,
    },
    wrongBtn: {
        backgroundColor: red,
        marginLeft: 40,
        marginRight: 40,
    },
});

export default Quiz;
