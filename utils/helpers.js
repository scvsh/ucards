import {View, StyleSheet, AsyncStorage} from 'react-native';
import React from 'react';

import {Notifications, Permissions} from 'expo';

const NOTIFICATION_KEY = 'uCards:notifications';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync,
    );
}

function createNotification() {
    return {
        title: 'Time to repeat!',
        body: "Don't forget to train again.",
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let nextNotify = new Date();
                            nextNotify.setHours(20);
                            nextNotify.setMinutes(0);

                            nextNotify.setDate(tomorrow.getDate() + 1);
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: nextNotify,
                                    repeat: 'day',
                                },
                            );

                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true),
                            );
                        }
                    },
                );
            }
        });
}
