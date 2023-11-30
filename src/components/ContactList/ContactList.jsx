import React from 'react';
import { IoPersonRemove } from 'react-icons/io5';
import { Btn, Item, List } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <span>{name}:</span>
            <span>{number}</span>
            <Btn type="button" onClick={() => onDelete(id)}>
              <IoPersonRemove size="16" />
            </Btn>
          </Item>
        );
      })}
    </List>
  );
};
