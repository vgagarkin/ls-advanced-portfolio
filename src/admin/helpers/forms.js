export const convertIntoFormData = plainObject => {
  const formData = new FormData();
  Object.keys(plainObject).forEach(key => {
    formData.append(key, plainObject[key]);
  });
  return formData;
};
