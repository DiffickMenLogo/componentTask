import React, { useEffect, useState } from 'react';
import { ICardProps, Info, INotebook, IStateForm, Result } from 'types/types';
import { validateForm } from 'utils/validate';
import deafult from '../../assets/img/defult.gif';
import './Form.scss';
interface IFormProps {
  addCharacter: (character: IStateForm) => void;
  characters: Result[];
}
interface IStringIndex {
  [key: string]: string;
}
export function Form(props: IFormProps) {
  const [id, setId] = useState(props.characters.length + 1000);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Alive');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('None');
  const [gender, setGender] = useState('Male');
  const [created, setCreated] = useState('');
  const [image, setImage] = useState<string | ArrayBuffer>('');
  const [agree, setAgree] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [errors, setErrors] = useState({
    nameError: '',
    speciesError: '',
  } as IStringIndex);
  useEffect(() => {
    if (
      name.match('/^[a-zA-Zа-яА-Я]+$/')
        ? false
        : true && species.match('/^[a-zA-Zа-яА-Я]+$/')
        ? false
        : true && created !== '' && agree
    ) {
      if (disabled === true) {
        setdisabled(false);
      }
    }
  }, [agree, errors]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    errors[name + 'Error'] = validateForm(name, value);
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'species':
        setSpecies(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'created':
        setCreated(value);
        break;
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const file = target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result != null) {
        setImage(reader.result);
      }
    };
  };
  const handleSwicherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.checked ? 'Dead' : 'Alive';
    setStatus(value);
  };
  const handleSubmite = (e: React.FormEvent<HTMLFormElement>) => {
    if (
      Object.values(errors).join('') !== '' ||
      name === '' ||
      status === '' ||
      species === '' ||
      gender === '' ||
      image === '' ||
      agree === false
    ) {
      e.preventDefault();
      alert('Заполните все поля');
    } else {
      e.preventDefault();
      props.addCharacter({
        id: id,
        name: name,
        status: status,
        species: species,
        type: type,
        image: image,
        created: created,
        gender: gender,
      });
      setName('');
      setAgree(false);
      setCreated('');
      setGender('Male');
      setType('None');
      setSpecies('');
      setImage('');
      setId(props.characters.length + 1000);
      setStatus('Alive');
    }
  };

  return (
    <form className="form" action="" onSubmit={(e) => handleSubmite(e)} data-testid="renders">
      <div className="form__title">Create new Card</div>
      <div className="form__input">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => handleInputChange(e)}
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
        />
      </div>
      {errors.nameError && <div className="error">{errors.nameError}</div>}
      <div className="form__input">
        <label htmlFor="species">Species</label>
        <input
          onChange={(e) => handleInputChange(e)}
          value={species}
          type="text"
          id="species"
          placeholder="Enter species"
          name="species"
        />
      </div>
      {errors.speciesError && <div className="error">{errors.speciesError}</div>}
      <div className="form__input">
        <label htmlFor="Type">Type</label>
        <input
          value={type}
          onChange={(e) => handleInputChange(e)}
          name="type"
          type="text"
          id="type"
          placeholder="Type"
        />
      </div>
      <div className="form__input">
        <label htmlFor="Type">Created</label>
        <input
          value={created}
          onChange={(e) => handleInputChange(e)}
          name="created"
          type="date"
          id="created"
        />
      </div>
      <div className="form__input">
        <label htmlFor="Gender">Gender</label>
        <select
          onChange={(e) => handleInputChange(e)}
          value={gender}
          name="screenRefreshRate"
          id="refreshRate"
          placeholder="Enter screen refresh rate"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <div className="form__input">
        <div className="form__input__title">Status</div>
        <div className="form__input__radio">
          <label className="switch-text" htmlFor="switch">
            Alive
          </label>
          <label className="switch switch__status">
            <input
              type="checkbox"
              name="status"
              checked={status == 'Alive' ? false : true}
              onChange={(e) => handleSwicherChange(e)}
            />
            <span className="slider round"></span>
          </label>
          <label htmlFor="switch" className="switch-text">
            Dead
          </label>
        </div>
      </div>
      <div className="form__input">
        <div className="inline">
          <label htmlFor="upload">Upload you image</label>
          <input type="file" id="upload" name="image" onChange={(e) => handleImageChange(e)} />
        </div>
      </div>
      <div className="form__input center">
        <div className="inline">
          <input
            type="checkbox"
            name="times"
            id="times"
            onChange={() => setAgree(!agree)}
            checked={agree}
          />
          <label htmlFor="times">I agree to the terms and conditions</label>
        </div>
      </div>
      <div className="form__input">
        <button type="submit" disabled={disabled}>
          Submit
        </button>
      </div>
    </form>
  );
}
