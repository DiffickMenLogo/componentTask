import React, { useEffect, useRef, useState } from 'react';
import './CartModal.scss';
import deafult from '../../assets/img/defult.gif';
import { Result } from 'types/types';

export function CartModal({
  setIsModalOpen,
  modalId,
  characters,
}: {
  setIsModalOpen: (value: boolean) => void;
  modalId: number;
  characters: Result[];
}) {
  const modal = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState({
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    image: '',
    location: {
      name: '',
      url: '',
    },
    origin: {
      name: '',
      url: '',
    },
    episode: [],
    url: '',
    created: '',
  } as Result);
  useEffect(() => {
    modalContent(modalId);
  }, []);

  const handleExit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.id == 'exit' || target.id == 'background-modal') {
      setIsModalOpen(false);
    }
  };
  const modalContent = async (modalId: number) => {
    if (modalId > 1000) {
      const currentCharacter = characters.find((character) => character.id === modalId);
      if (currentCharacter) {
        setCharacter({
          id: modalId,
          name: currentCharacter.name,
          status: currentCharacter.status,
          species: currentCharacter.species,
          type: currentCharacter.type,
          gender: currentCharacter.gender,
          image: currentCharacter.image,
          location: {
            name: 'Unknown',
            url: '',
          },
          origin: {
            name: 'Unknown',
            url: '',
          },
          episode: [],
          url: '',
          created: currentCharacter.created,
        });
      }
    } else {
      const responce = await fetch(`https://rickandmortyapi.com/api/character/${modalId}`);
      const data = await responce.json();
      console.log(data);
      setCharacter(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="cartModal" id="background-modal" ref={modal} onClick={(e) => handleExit(e)}>
      <div className="cartModal__content">
        <div className="cartModal__header">
          {!isLoading ? (
            <div className="cartModal__title">{character.name}</div>
          ) : (
            <div className="cartModal__title">Loading...</div>
          )}
          <div className="cartModal__close" id="exit" onClick={(e) => handleExit(e)}>
            X
          </div>
        </div>
        {!isLoading ? (
          <div className="cartModal__body">
            <div className="cartModal__item">
              <div className="cartModal__item__img">
                <img src={character.image} alt="some" />
              </div>
              <div className="cartModal__item__info">
                <div className="cartModal__item__info__text">Name: {character.name}</div>
                <div className="cartModal__item__info__text">Status: {character.status}</div>
                <div className="cartModal__item__info__text">Spices: {character.species}</div>
                <div className="cartModal__item__info__text">
                  Type: {character.type == '' ? 'None' : character.type}
                </div>
                <div className="cartModal__item__info__text">
                  Created: {character.created.slice(0, 10)}
                </div>
              </div>
              <div className="cartModal__item__info">
                <div className="cartModal__item__info__text">
                  Epizodes: {character.episode.length}
                </div>
              </div>
              <div className="cartModal__item__info">
                <div className="cartModal__item__info__text">
                  Location: {character.location.name}
                </div>
              </div>
              <div className="cartModal__item__info">
                <div className="cartModal__item__info__text">Origin: {character.origin.name}</div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
