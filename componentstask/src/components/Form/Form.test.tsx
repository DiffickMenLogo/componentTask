import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Form } from './Form';
import { INotebook } from 'types/types';

describe('Card', () => {
  it('renders', () => {
    render(
      <Form
        addCharacter={() => {}}
        characters={[
          {
            id: 0,
            name: '',
            status: 'Alive',
            species: '',
            type: 'None',
            image: '',
            location: {
              name: '',
              url: '',
            },
            episode: [],
            origin: {
              name: '',
              url: '',
            },
            url: '',
            gender: '',
            created: '',
          },
        ]}
      />
    );
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Species/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Created/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload you image/i)).toBeInTheDocument();
    expect(screen.getByText(/I agree to the terms and conditions/i)).toBeInTheDocument();
  });
});
