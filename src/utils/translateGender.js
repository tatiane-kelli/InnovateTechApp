function translateGender (gender) {
  switch (gender.toLowerCase()) {
    case 'male':
      return 'Masculino';
    case 'female':
      return 'Feminino';
    default:
      return gender;
  }
};

export default translateGender;