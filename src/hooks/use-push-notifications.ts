import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import WebEngage from 'react-native-webengage';

const BACKGROUND_NOTIFICATION_TASK = 'WEBENGAGE_BACKGROUND_NOTIFICATION_TASK';
const webengage = new WebEngage();

// Define the background notification task
TaskManager.defineTask<Notifications.FirebaseRemoteMessage>(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data: remoteMessage, error }) => {
    if (error) return;
    // Foreground delivery is handled by addNotificationReceivedListener,
    // so skip here to avoid handling the same push twice.
    if (AppState.currentState === 'active') return;
    const data = remoteMessage?.data;
    if (data?.source === 'webengage') {
      const webengage = new WebEngage();
      webengage.push.onMessageReceived({ data });
    }
  }
);

/**
 * Hook to set up WebEngage push notifications for both foreground and background
 * Handles Android 13+ permission requests and device token registration
 */
export function usePushNotifications() {
  useEffect(() => {
    let subscription: Notifications.EventSubscription | undefined;

    const setupPushNotifications = async () => {
      try {
        // Register background notification task
        await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

        // Android only: Register FCM token with WebEngage
        if (Platform.OS === 'android') {
          await registerFcmToken();
        }

        // Set up foreground notification listener
        subscription = Notifications.addNotificationReceivedListener(
          (notification: Notifications.Notification) => {
            const trigger =
              notification.request.trigger as Notifications.PushNotificationTrigger;
            const data = trigger?.remoteMessage?.data;
            if (data?.source === 'webengage') {
              webengage.push.onMessageReceived({ data });
            }
          }
        );
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    };

    setupPushNotifications();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
}

/**
 * Register FCM token with WebEngage (Android only)
 */
async function registerFcmToken() {
  try {
    const { data: token } = await Notifications.getDevicePushTokenAsync();
    if (token) {
      webengage.push.sendFcmToken(token);
    }
  } catch (error) {
    console.error('Error registering FCM token:', error);
  }
}

/**
 * Request notification permission from user and register with WebEngage
 * Required for Android 13+ to receive push notifications
 */
export async function requestPushPermission() {
  try {
    const settings = await Notifications.getPermissionsAsync();
    let status = settings.status;

    if (status !== 'granted') {
      const request = await Notifications.requestPermissionsAsync();
      status = request.status;
    }

    // Pass the permission status to WebEngage
    webengage.user.setDevicePushOptIn(status === 'granted');

    return status === 'granted';
  } catch (error) {
    console.error('Error requesting push permission:', error);
    return false;
  }
}
