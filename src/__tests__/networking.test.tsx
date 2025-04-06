import { submitPayment } from '../networking/Paymentservice';

global.fetch = jest.fn() as jest.Mock;

describe('submitPayment', () => {
  const mockOnSubmit = jest.fn();
  const mockOnError = jest.fn();
  const validCardNumber = '4111111111111111';
  const validExpiryDate = '12/25';
  const validCvv = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onSubmit with data when the request succeeds', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: jest
        .fn()
        .mockResolvedValueOnce(JSON.stringify({ token: 'test_token' })),
    });

    await submitPayment(
      validCardNumber,
      validExpiryDate,
      validCvv,
      mockOnSubmit,
      mockOnError
    );

    expect(mockOnSubmit).toHaveBeenCalledWith({ token: 'test_token' });
    expect(mockOnError).not.toHaveBeenCalled();
  });

  it('should call onError with error data when the request fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: jest
        .fn()
        .mockResolvedValueOnce(JSON.stringify({ error: 'Invalid card' })),
    });

    await submitPayment(
      validCardNumber,
      validExpiryDate,
      validCvv,
      mockOnSubmit,
      mockOnError
    );

    expect(mockOnError).toHaveBeenCalledWith({ error: 'Invalid card' });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should call onError when the response is empty', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(''),
    });

    await submitPayment(
      validCardNumber,
      validExpiryDate,
      validCvv,
      mockOnSubmit,
      mockOnError
    );

    expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should call onError on network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    await submitPayment(
      validCardNumber,
      validExpiryDate,
      validCvv,
      mockOnSubmit,
      mockOnError
    );

    expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
