export class UserModel {
  id: number;
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
      id: 0,
      name: 'Legyek Réka Matilda',
      email: 'legyekrekamatilda@valami.com',
      address: 'Futrinka utca',
      dateOfBirth: '2001.01.01',
      gender: 'male'
    };
  }

  static get emptyUser(): UserModel {
    return {
      id: 0,
      name: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: ''
    };
  }

}
