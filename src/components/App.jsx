import { useState } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorage from '../components/hooks/useLocaStorage';

import React from 'react';
import { GlobalStyle } from './GlobalStyle';

import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Header } from './Header/Header';
import { Filter } from './Filter/Filter';

import initialContacts from './contacts.json';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customId = 'custom-id-yes';

export const toastifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  toastId: customId,
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    const isExist = contacts.some(
      ({ name, number }) =>
        name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        number.trim() === newContact.number.trim()
    );

    if (isExist) {
      return toast.error(
        `${newContact.name}: is already in contacts`,
        toastifyOptions
      );
    }

    setContacts(contacts => [{ ...newContact, id: nanoid() }, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );

    if (normalizedFilter && !filteredContacts.length) {
      toast.warn(`No contacts matching your request`, toastifyOptions);
    }

    return filteredContacts;
  };

  return (
    <Layout>
      <Section title="Phonebook">
        <ContactForm onAddContact={addContact} />

        {contacts.length > 0 && (
          <>
            <Header title="Contacts" />
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              onDelete={deleteContact}
              contacts={getVisibleContacts()}
            />
          </>
        )}
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Layout>
  );
}
