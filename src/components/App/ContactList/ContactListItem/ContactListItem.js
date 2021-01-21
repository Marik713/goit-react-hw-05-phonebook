import React from "react";
import styles from "./ContactListItem.module.css";
import formatPhone from "../../../../helpers/phoneformatter";

const ContactListItem = ({ name, number, onRemove }) => (
  <li className={styles.ContactList_item}>
    <div className={styles.contactWrapper}>
    <p>{name}</p>
    <p className={styles.numberContact}>{formatPhone(number.split(""))}</p>
    </div>
    {
      <button
        className={styles.ContactList_button}
        type="button"
        name="delete"
        onClick={onRemove}
      >
        &#10006;
      </button>
    }
  </li>
);

export default ContactListItem;
