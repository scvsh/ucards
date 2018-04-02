import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Constants} from 'expo';
import {black, white, purple, pink} from './utils/colors';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddNewCard from './components/AddNewCard';
import Quiz from './components/Quiz';
import {setCustomText} from 'react-native-global-props';
import {
    Icon,
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

const customTextProps = {
    style: {
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'Roboto Mono',
    },
};

const Tabs = TabNavigator(
    {
        DeckList: {
            screen: DeckList,
            navigationOptions: {
                headerTitle: <H1>μCards</H1>,
                tabBarLabel: 'My Decks',
                tabBarIcon: ({tintColor}) => <Icon name="ios-albums-outline" />,
            },
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                headerTitle: <H1>New Deck</H1>,
                tabBarLabel: 'New Deck',
                tabBarIcon: ({tintColor}) => <Icon name="ios-add-outline" />,
            },
        },
    },
    {
        navigationOptions: {},
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? black : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : pink,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowRadius: 5,
                shadowOpacity: 1,
            },
        },
    },
);

const MainNavigator = StackNavigator({
    MainView: {
        screen: Tabs,
        title: 'My Decks',
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: black,
        },
    },

    AddNewCard: {
        screen: AddNewCard,
        navigationOptions: {
            headerTintColor: black,
        },
    },

    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: black,
        },
    },
});

function AppStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}

export default class App extends React.Component {
    componentWillMount() {
        setCustomText(customTextProps);
    }
    render() {
        return (
            <View style={styles.container}>
                <AppStatusBar
                    backgroundColor={white}
                />
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
});
