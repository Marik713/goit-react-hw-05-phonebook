import React from "react";
import PropTypes from "prop-types";
import styles from "./Alert.module.css";

const Alert = () => (
  <div className={styles.alertNotification}>Contact already exist!!!</div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;
