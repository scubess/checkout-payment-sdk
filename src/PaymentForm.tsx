import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { defaultTheme } from './theme/styles';
import { validateFields } from './networking/Validation';
import { submitPayment } from './networking/Paymentservice';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  onError: (error: any) => void;
  theme?: object;
  translations?: Record<string, string>;
}

const PaymentForm = forwardRef(
  ({ onSubmit, onError }: PaymentFormProps, ref) => {
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touchedFields, setTouchedFields] = useState({
      cardNumber: false,
      expiryDate: false,
      cvv: false,
    });

    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(),
    }));

    const handleBlur = (field: string) => {
      setTouchedFields((prevTouchedFields) => {
        const updatedTouchedFields = { ...prevTouchedFields, [field]: true };

        // Validate only the field that was blurred
        const updatedErrors = validateFields(
          cardNumber,
          expiryDate,
          cvv,
          updatedTouchedFields
        );
        setErrors(updatedErrors);
        // Update form validity
        const isValid = Object.keys(updatedErrors).length === 0;
        setIsFormValid(isValid);
        return updatedTouchedFields;
      });
    };

    const handleValidation = (): boolean => {
      // Validate all fields before submitting
      const validationErrors = validateFields(cardNumber, expiryDate, cvv, {
        cardNumber: true,
        expiryDate: true,
        cvv: true,
      });
      setErrors(validationErrors);

      // If there are no validation errors, enable the submit button
      const isValid = Object.keys(validationErrors).length === 0;
      console.log('isValid', isValid);
      setIsFormValid(isValid);
      return isValid;
    };

    const handleSubmit = async () => {
      if (!handleValidation()) {
        onError && onError(errors);
        return;
      }
      submitPayment(cardNumber, expiryDate, cvv, onSubmit, onError);
    };

    return (
      <View style={defaultTheme.container}>
        <Text style={defaultTheme.label}>Card Number</Text>
        <TextInput
          style={defaultTheme.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          onBlur={() => handleBlur('cardNumber')}
          keyboardType="numeric"
        />
        {touchedFields.cardNumber && errors.cardNumber && (
          <Text style={defaultTheme.errorText}>{errors.cardNumber}</Text>
        )}

        <Text style={defaultTheme.label}>Expiry Date (MM/YY)</Text>
        <TextInput
          style={defaultTheme.input}
          value={expiryDate}
          onChangeText={setExpiryDate}
          onBlur={() => handleBlur('expiryDate')}
          keyboardType="numeric"
        />
        {touchedFields.expiryDate && errors.expiryDate && (
          <Text style={defaultTheme.errorText}>{errors.expiryDate}</Text>
        )}

        <Text style={defaultTheme.label}>CVV</Text>
        <TextInput
          style={defaultTheme.input}
          value={cvv}
          onChangeText={setCvv}
          onBlur={() => handleBlur('cvv')}
          keyboardType="numeric"
          secureTextEntry
        />
        {touchedFields.cvv && errors.cvv && (
          <Text style={defaultTheme.errorText}>{errors.cvv}</Text>
        )}

        <TouchableOpacity
          style={[
            defaultTheme.submitButton,
            // eslint-disable-next-line react-native/no-inline-styles
            { opacity: isFormValid ? 1 : 0.5 },
          ]} // Disable button by reducing opacity
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={defaultTheme.submitButtonText}>Submit Payment</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

export default PaymentForm;
