import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import Alert from "./Alert/Alert";
import ContactForm from "./ContactForm/ContactForm";
import titleTransition from "../../transitions/title.module.css";
import alertTransition from "../../transitions/alert.module.css";
import filterTransition from "../../transitions/filter.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    sameUser: false,
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((contact) => contact.name)
      .includes(task.name);

    if (searchSameName) {
      this.setState({ sameUser: true });
      setTimeout(() => this.setState({ sameUser: false }), 3500);
    } else if (task.name.length === 0) {
      alert("Fields must be filled!");
    } else {
      const contact = {
        ...task,
        id: uuidv4(),
      };

      this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter, sameUser } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="mainContainer">
        <CSSTransition
          in={true}
          timeout={500}
          classNames={titleTransition}
          appear={true}
        >
          <h1 className="mainTitle">Phonebook</h1>
        </CSSTransition>

        <ContactForm onAddContact={this.addContact} />

        <CSSTransition
          in={sameUser}
          timeout={250}
          unmountOnExit
          classNames={alertTransition}
        >
          <Alert />
        </CSSTransition>
        <CSSTransition
          in={visibleContacts.length > 1}
          timeout={250}
          unmountOnExit
          classNames={filterTransition}
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}
