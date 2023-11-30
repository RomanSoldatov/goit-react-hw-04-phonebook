import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Input, LabelDescr } from './Filter.styled';
import { LabelWrapper } from 'components/ContactForm/ContactForm.styled';

export const Filter = ({ value, onChange }) => (
  <LabelDescr>
    <LabelWrapper>
      <BsSearch size="16" /> Find contacts by name
    </LabelWrapper>
    <Input type="text" value={value} onChange={onChange} placeholder="search" />
  </LabelDescr>
);
