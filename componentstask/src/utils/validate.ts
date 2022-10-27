export function validateForm(filedName: string, value: string) {
  let valid;
  let error = '';
  switch (filedName) {
    case 'name':
      valid = value.match(/^[a-zA-Zа-яА-Я]+$/);
      valid ? '' : (error = 'Name must be only letters');
      break;
    case 'species':
      valid = value.match(/^[a-zA-Zа-яА-Я]+$/);
      valid ? '' : (error = 'Species must be only letters');
      break;
  }
  return error;
}
