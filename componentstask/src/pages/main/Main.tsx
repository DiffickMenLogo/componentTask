import { MyInput } from 'components/Input/MyInput';
import React, { useCallback, useEffect, useState } from 'react';
import './Main.scss';
import { IStateForm, RootObject } from '../../types/types';
import { Card } from 'components/Card/Card';
import { Form } from 'components/Form/Form';
import { getRickAndMortyCharacters } from 'utils/rickApi';
import { CartModal } from 'components/CartModal/CartModal';

export function Main() {
  const [characters, setCaracters] = useState({} as RootObject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [searchName, setSearchName] = useState(localStorage.getItem('input') || '');
  const getCharacters = async () => {
    const characters = await getRickAndMortyCharacters(searchName);
    setCaracters(characters);
  };
  const openModal = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const classList = e.currentTarget.classList;
    if (classList.contains('favorite')) {
      return;
    } else {
      setIsModalOpen(true);
    }
  }, []);
  useEffect(() => {
    if (!characters.results) {
      getCharacters();
    }
  }, []);
  useEffect(() => {
    getCharacters();
  }, [searchName]);
  const addCharacter = useCallback(
    (character: IStateForm) => {
      const newCharacters = {
        info: characters.info,
        results: [...characters.results, character],
      } as RootObject;
      setCaracters(newCharacters);
    },
    [characters]
  );
  return (
    <div className="main__container">
      {isModalOpen && (
        <CartModal
          characters={characters.results}
          setIsModalOpen={setIsModalOpen}
          modalId={modalId}
        />
      )}
      {characters.results ? (
        <Form addCharacter={addCharacter} characters={characters.results} />
      ) : (
        <div className="error-main">
          If loading is too long, please try use another name for search.
        </div>
      )}
      <p className="centred-p">Enter Name</p>
      <MyInput setSearchName={setSearchName} />
      {characters.results ? (
        <div className="cards__container" data-testid="cards-container">
          {characters.results.map((card) => (
            <Card
              key={card.id}
              character={card}
              info={characters.info}
              openModal={openModal}
              setModalId={setModalId}
            />
          ))}
        </div>
      ) : (
        <div className="error-main">
          <div className="box">
            <p>Loading</p>
            <div className="spinner ease"></div>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
}
