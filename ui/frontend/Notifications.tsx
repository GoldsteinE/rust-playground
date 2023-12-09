import React, { useCallback } from 'react';
import { Portal } from 'react-portal';

import { Close } from './Icon';
import { useAppDispatch, useAppSelector } from './hooks';
import { seenRustSurvey2022 } from './reducers/notifications';
import * as selectors from './selectors';

import styles from './Notifications.module.css';

const SURVEY_URL = 'https://blog.rust-lang.org/2022/12/05/survey-launch.html';

const Notifications: React.FC = () => {
  return (
    <Portal>
      <div className={styles.container}>
        <RustSurvey2022Notification />
      </div>
    </Portal>
  );
};

const RustSurvey2022Notification: React.FC = () => {
  const showRustSurvey2022 = useAppSelector(selectors.showRustSurvey2022Selector);

  const dispatch = useAppDispatch();
  const seenRustSurvey2021 = useCallback(() => dispatch(seenRustSurvey2022()), [dispatch]);

  return showRustSurvey2022 ? (
    <Notification onClose={seenRustSurvey2021}>
      Please help us take a look at who the Rust community is composed of, how the Rust project is
      doing, and how we can improve the Rust programming experience by completing the{' '}
      <a href={SURVEY_URL}>2022 State of Rust Survey</a>. Whether or not you use Rust today, we want
      to know your opinions.
    </Notification>
  ) : null;
};

interface NotificationProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ onClose, children }) => (
  <div className={styles.notification}>
    <div className={styles.notificationContent}>{children}</div>
    <button className={styles.close} onClick={onClose}>
      <Close />
    </button>
  </div>
);

export default Notifications;
