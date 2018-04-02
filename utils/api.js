import {AsyncStorage} from 'react-native';

export const UDACICARDS_STORAGE_KEY = 'u.Cards:decks';

let initData = {
    AND: {
        title: 'AND',
        questions: [
            {
                question: '1&&1',
                answer: '1',
            },
            {
                question: '1&&0',
                answer: '0',
            },
            {
                question: '0&&1',
                answer: '0',
            },
            {
                question: '0&&0',
                answer: '0',
            },
        ],
    },
    OR: {
        title: 'OR',
        questions: [
            {
                question: '1||1',
                answer: '1',
            },
            {
                question: '1||0',
                answer: '1',
            },
            {
                question: '0||1',
                answer: '1',
            },
            {
                question: '0||0',
                answer: '0',
            },
        ],
    },
    XOR: {
        title: 'XOR',
        questions: [
            {
                question: '1||1',
                answer: '0',
            },
            {
                question: '1||0',
                answer: '1',
            },
            {
                question: '0||1',
                answer: '1',
            },
            {
                question: '0||0',
                answer: '0',
            },
        ],
    },
};

function finalDeckResults(results) {
    return results === null ? setInitData() : JSON.parse(results);
}

export function fetchData() {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(finalDeckResults);
}

export function getDeck(item) {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        .then(finalDeckResults)
        .then(results => results[item]);
}

export function addNewDeckTitle(title, key) {
    return AsyncStorage.mergeItem(
        UDACICARDS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
                title,
                questions: [],
            },
        }),
    );
}

export function addNewCardToDeck(title, content) {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(data => {
        decks = JSON.parse(data);
        decks[title].questions.push(content);
        AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks));
    });
}

function setInitData() {
    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(initData));
    return initData;
}
