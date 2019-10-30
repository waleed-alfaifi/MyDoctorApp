// export default transformName = name => {
//   const firstLetters = name.split(' ');
//   firstLetters
//     .map(letter => {
//       letter.toUpperCase();
//       return letter[0];
//     })
//     .join('');
// };

export default transformName = (name = '') => {
  const firstLetters = name.split(' ');
  return firstLetters
    .map(name => {
      name.toUpperCase();
      return name[0];
    })
    .join('');
};

// name = Waleed Hasan
// firstLetters = [Waleed, Hasan]
//
