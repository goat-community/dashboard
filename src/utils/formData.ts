export function objectToFormData(obj: object): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach((element) => {
    formData.append(element[0], element[1]);
  });

  return formData;
}
