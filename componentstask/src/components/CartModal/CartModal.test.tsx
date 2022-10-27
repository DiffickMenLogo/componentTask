import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { INotebook } from 'types/types';
import { CartModal } from './CartModal';

const character = {
  id: 1,
  name: 'Test',
  status: 'Alive',
  species: 'test',
  type: 'None',
  image: 'test',
  gender: 'test',
  created: 'test',
  location: {
    name: 'test',
    url: '',
  },
  episode: [],
  origin: {
    name: 'test',
    url: '',
  },
  url: 'test',
};

describe('CardModal', () => {
  it('renders', () => {
    render(<CartModal characters={[character, character]} setIsModalOpen={() => {}} modalId={1} />);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Spices/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Epizodes/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Origin/i)).toBeInTheDocument();
  });
});
