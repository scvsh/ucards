import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import {fetchData} from '../utils/api';
import {Deck} from './Deck';
import {white, purple, pink, gray, orange, lightGray} from '../utils/colors';
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

class DecksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deckList: {},
        };
    }

    componentDidMount() {
        fetchData().then(results => {
            this.setState(() => ({deckList: results}));
        });
    }

    navigateToDeck(item) {
        const {navigate} = this.props.navigation;
        return navigate('Deck', {item});
    }

    render() {
        const {deckList} = this.state;

        return (
            <Container>
                <Content>
                    {Object.keys(deckList).map(item => {
                        return (
                            <Card key={deckList[item].title}>
                                <CardItem>
                                    <Body style={{alignItems: 'center'}}>
                                        <Content padder>
                                            <H3>{deckList[item].title}</H3>
                                        </Content>
                                        <Button
                                            block
                                            dark
                                            onPress={() =>
                                                this.navigateToDeck(
                                                    deckList[item].title,
                                                )
                                            }>
                                            <Text>
                                                {deckList[item].questions
                                                    .length === 1
                                                    ? `${
                                                          deckList[item]
                                                              .questions.length
                                                      } card`
                                                    : `${
                                                          deckList[item]
                                                              .questions.length
                                                      } cards`}
                                            </Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        );
                    })}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightGray,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    appLogo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: orange,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    deckBox: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#dddae2',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: pink,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    cardsQtd: {
        fontSize: 18,
        textAlign: 'center',
        color: gray,
    },
});

export default DecksList;
