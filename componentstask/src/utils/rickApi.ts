export function getRickAndMortyCharacters(searchName: string) {
  return fetch(`https://rickandmortyapi.com/api/character/?name=${searchName}`).then((res) =>
    res.json()
  );
}
