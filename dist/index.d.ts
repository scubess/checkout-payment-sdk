import * as react from 'react';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  onError: (error: any) => void;
  theme?: object;
  translations?: Record<string, string>;
}
declare const PaymentForm: react.ForwardRefExoticComponent<
  PaymentFormProps & react.RefAttributes<unknown>
>;

declare const submitPayment: (
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  onSubmit: Function,
  onError: Function
) => Promise<void>;

declare const validateFields: (
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  touchedFields: Record<string, boolean>
) => Record<string, string>;

declare const defaultTheme: {
  container: {
    padding: number;
    backgroundColor: string;
    borderRadius: number;
    margin: number;
    shadowColor: string;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
  };
  label: {
    fontSize: number;
    fontWeight: 'bold';
    marginBottom: number;
    color: string;
  };
  input: {
    height: number;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    marginBottom: number;
    paddingHorizontal: number;
    backgroundColor: string;
  };
  errorText: {
    color: string;
    fontSize: number;
    marginBottom: number;
  };
  submitButton: {
    backgroundColor: string;
    paddingVertical: number;
    borderRadius: number;
    alignItems: 'center';
  };
  submitButtonText: {
    color: string;
    fontSize: number;
    fontWeight: 'bold';
  };
};

declare function multiply(a: number, b: number): number;

export { PaymentForm, defaultTheme, multiply, submitPayment, validateFields };
