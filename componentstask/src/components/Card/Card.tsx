import React, { useState } from 'react';
import { ICardProps, Result, StateCardType } from 'types/types';
import './Card.scss';
import { ReactComponent as LikeImg } from '../../assets/img/like.svg';
import { ReactComponent as FavouriteImg } from '../../assets/img/favourite.svg';

export function Card(props: ICardProps) {
  // constructor(props: ICardProps | Readonly<ICardProps>) {
  //   super(props);
  //   this.state = {
  //     like: 'false',
  //     likesNumber: 0,
  //     favourite: 'false',
  //   };
  //   this.clickLike = this.clickLike.bind(this);
  //   this.clickFavourite = this.clickFavourite.bind(this);
  // }
  const { name, image, species, id, type, gender, created, status } = props.character;
  const [like, setLike] = useState('false');
  const [likesNumber, setLikesNumber] = useState(0);
  const [favorite, setFavorite] = useState('false');

  const clickLike = () => {
    const newlike = like === 'false' ? 'true' : 'false';
    setLike(newlike);
    like === 'false'
      ? setLikesNumber((likesNumber) => likesNumber + 1)
      : setLikesNumber((likesNumber) => likesNumber - 1);
  };

  const clickFavourite = () => {
    const newFavourite = favorite === 'false' ? 'true' : 'false';
    setFavorite(newFavourite);
  };

  return (
    <div
      className={`card__container ${favorite === 'true' ? 'favourite' : ''}`}
      data-testid="character-card"
    >
      <div
        className="card__content"
        onClick={(e) => {
          props.openModal(e);
          props.setModalId(id);
        }}
      >
        <h3 className="card__text">{name}</h3>
        <img className="card__img" src={image} alt={name} />
        <h5 className="card__text">
          Status: <span>{status}</span>
        </h5>
        <h5 className="card__text">
          Species: <span>{species}</span>
        </h5>
        <h5 className="card__text">
          Type: <span>{type == '' ? 'None' : type}</span>
        </h5>
        <h5 className="card__text">
          Gender: <span>{gender}</span>
        </h5>
        <h5 className="card__text">
          Created:<span>{new Date(created).toDateString()}</span>
        </h5>
      </div>
      <div className="card__likes-container">
        <div className="card__button" data-testid="likeBtn">
          <LikeImg
            className="card__like-img"
            width="20px"
            height="20px"
            fill={`${like === 'true' ? 'green' : ''}`}
            onClick={clickLike}
            data-testid="likeImg"
          />
          {likesNumber}
        </div>
        <div className="card__button">
          <FavouriteImg
            className="card__favourite-img"
            width="20px"
            height="20px"
            fill={`${favorite === 'true' ? 'red' : ''}`}
            onClick={clickFavourite}
            data-testid="favouriteImg"
          />
        </div>
      </div>
    </div>
  );
}
