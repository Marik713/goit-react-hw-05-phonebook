import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.title}>Find contacts by name</h3>
      <input
        className={styles.filterEditor_input}
        type="text"
        value={value}
        onChange={(e) => onChangeFilter(e.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onchangeFilter: PropTypes.func,
};
