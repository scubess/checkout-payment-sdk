export const validateFields = (
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  touchedFields: Record<string, boolean>
) => {
  let errors: Record<string, string> = {};

  if (touchedFields.cardNumber && !/^[0-9]{16}$/.test(cardNumber)) {
    errors.cardNumber = 'Invalid card number';
  }
  if (
    touchedFields.expiryDate &&
    !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)
  ) {
    errors.expiryDate = 'Invalid expiry date';
  }
  if (touchedFields.cvv && !/^[0-9]{3,4}$/.test(cvv)) {
    errors.cvv = 'Invalid CVV';
  }

  return errors;
};
