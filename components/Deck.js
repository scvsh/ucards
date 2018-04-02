import React, {Component} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {getDeck} from '../utils/api';
import {NavigationActions} from 'react-navigation';
import {white, purple, pink, orange, blue, gray, black} from '../utils/colors';

import {
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

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: {questions: []},
            opacity: new Animated.Value(0),
        };
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: <H1>{navigation.state.params.item}</H1>,
    });

    componentDidMount() {
        const {opacity} = this.state;
        getDeck(this.props.navigation.state.params.item)
            .then(results => this.setState(() => ({deck: results})))
            .then(() =>
                Animated.timing(opacity, {toValue: 1, duration: 800}).start(),
            );
    }

    startQuiz = item => {
        const {navigate} = this.props.navigation;
        return navigate('Quiz', {item});
    };

    handleNavigationBackToItem = content => {
        const newDeck = this.state.deck;
        newDeck.questions.push(content);
        this.setState(() => ({deck: newDeck}));
    };

    addNewCard = item => {
        const {navigate} = this.props.navigation;

        return navigate('AddNewCard', {
            item,
            navBack: this.handleNavigationBackToItem,
        });
    };

    render() {
        const {deck, opacity} = this.state;

        return (
            <Container>
                <Content padder>
                    <H3 style={styles.cardsQtd}>
                        {deck.questions.length === 1
                            ? `${deck.questions.length} card`
                            : `${deck.questions.length} cards`}
                    </H3>
                    <Button
                        style={{marginBottom: '3%'}}
                        block
                        bordered
                        dark
                        onPress={() => this.addNewCard(deck.title)}>
                        <Text>Add Card</Text>
                    </Button>
                    {deck.questions.length > 0 ? (
                        <Button
                            block
                            dark
                            onPress={() => this.startQuiz(deck.title)}>
                            <Text>Start Quiz</Text>
                        </Button>
                    ) : (
                        <Text style={styles.message}>
                            You should create a card first
                        </Text>
                    )}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    cardsQtd: {
        fontSize: 18,
        textAlign: 'center',
        color: gray,
        marginBottom: 20,
    },
    addBtn: {
        backgroundColor: blue,
        marginLeft: 40,
        marginRight: 40,
    },
    quizBtn: {
        backgroundColor: orange,
        marginLeft: 40,
        marginRight: 40,
    },
    message: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
    },
});

export default Deck;
