export class UserModel {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  gender: string;

  constructor (param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get exampleUser(): UserModel {
    return {
      id: '',
      name: 'Legyek Réka Matilda',
      email: 'legyekrekamatilda@valami.com',
      address: 'Futrinka utca',
      dateOfBirth: '2001.01.01',
      gender: 'male',
    };
  }

  static get emptyUser(): UserModel {
    return {
      id: '',
      name: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: '',
    };
  }

}
