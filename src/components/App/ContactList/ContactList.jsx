import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import ContactListItem from "./ContactListItem/ContactListItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import contactTransition from "../../../transitions/contact.module.css";

const ContactList = ({ contacts, onRemoveContact }) => (
  <TransitionGroup component="ul" className={styles.ContactList}>
    {contacts.map(({ id, name, number }) => (
      <CSSTransition
        key={id}
        timeout={250}
        unmountOnExit
        classNames={contactTransition}
      >
        <ContactListItem
          key={id}
          name={name}
          number={number}
          onRemove={() => onRemoveContact(id)}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
