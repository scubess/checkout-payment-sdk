import { validateFields } from '../networking/Validation';

describe('validateFields', () => {
  it('should return an error for an invalid card number', () => {
    const errors = validateFields('123456789', '12/25', '123', {
      cardNumber: true,
    });
    expect(errors.cardNumber).toBe('Invalid card number');
  });

  it('should not return an error for a valid card number', () => {
    const errors = validateFields('4111111111111111', '12/25', '123', {
      cardNumber: true,
    });
    expect(errors.cardNumber).toBeUndefined();
  });

  it('should return an error for an invalid expiry date', () => {
    const errors = validateFields('4111111111111111', '13/25', '123', {
      expiryDate: true,
    });
    expect(errors.expiryDate).toBe('Invalid expiry date');
  });

  it('should return an error for an incorrectly formatted expiry date', () => {
    const errors = validateFields('4111111111111111', '1225', '123', {
      expiryDate: true,
    });
    expect(errors.expiryDate).toBe('Invalid expiry date');
  });

  it('should not return an error for a valid expiry date', () => {
    const errors = validateFields('4111111111111111', '12/25', '123', {
      expiryDate: true,
    });
    expect(errors.expiryDate).toBeUndefined();
  });

  it('should return an error for an invalid CVV', () => {
    const errors = validateFields('4111111111111111', '12/25', '12', {
      cvv: true,
    });
    expect(errors.cvv).toBe('Invalid CVV');
  });

  it('should not return an error for a valid 3-digit CVV', () => {
    const errors = validateFields('4111111111111111', '12/25', '123', {
      cvv: true,
    });
    expect(errors.cvv).toBeUndefined();
  });

  it('should not return an error for a valid 4-digit CVV', () => {
    const errors = validateFields('4111111111111111', '12/25', '1234', {
      cvv: true,
    });
    expect(errors.cvv).toBeUndefined();
  });

  it('should not validate a field if it is not touched', () => {
    const errors = validateFields('4111111111111111', '12/25', '123', {
      cardNumber: false,
      expiryDate: false,
      cvv: false,
    });
    expect(errors).toEqual({});
  });
});
