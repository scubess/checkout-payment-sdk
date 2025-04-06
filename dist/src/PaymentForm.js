import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { defaultTheme } from './theme/styles';
import { validateFields } from './networking/Validation';
import { submitPayment } from './networking/Paymentservice';
const PaymentForm = forwardRef(({ onSubmit, onError }, ref) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touchedFields, setTouchedFields] = useState({
        cardNumber: false,
        expiryDate: false,
        cvv: false,
    });
    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(),
    }));
    const handleBlur = (field) => {
        setTouchedFields((prevTouchedFields) => {
            const updatedTouchedFields = { ...prevTouchedFields, [field]: true };
            // Validate only the field that was blurred
            const updatedErrors = validateFields(cardNumber, expiryDate, cvv, updatedTouchedFields);
            setErrors(updatedErrors);
            // Update form validity
            const isValid = Object.keys(updatedErrors).length === 0;
            setIsFormValid(isValid);
            return updatedTouchedFields;
        });
    };
    const handleValidation = () => {
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
    return (_jsxs(View, { style: defaultTheme.container, children: [_jsx(Text, { style: defaultTheme.label, children: "Card Number" }), _jsx(TextInput, { style: defaultTheme.input, value: cardNumber, onChangeText: setCardNumber, onBlur: () => handleBlur('cardNumber'), keyboardType: "numeric" }), touchedFields.cardNumber && errors.cardNumber && (_jsx(Text, { style: defaultTheme.errorText, children: errors.cardNumber })), _jsx(Text, { style: defaultTheme.label, children: "Expiry Date (MM/YY)" }), _jsx(TextInput, { style: defaultTheme.input, value: expiryDate, onChangeText: setExpiryDate, onBlur: () => handleBlur('expiryDate'), keyboardType: "numeric" }), touchedFields.expiryDate && errors.expiryDate && (_jsx(Text, { style: defaultTheme.errorText, children: errors.expiryDate })), _jsx(Text, { style: defaultTheme.label, children: "CVV" }), _jsx(TextInput, { style: defaultTheme.input, value: cvv, onChangeText: setCvv, onBlur: () => handleBlur('cvv'), keyboardType: "numeric", secureTextEntry: true }), touchedFields.cvv && errors.cvv && (_jsx(Text, { style: defaultTheme.errorText, children: errors.cvv })), _jsx(TouchableOpacity, { style: [
                    defaultTheme.submitButton,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { opacity: isFormValid ? 1 : 0.5 },
                ], onPress: handleSubmit, disabled: !isFormValid, children: _jsx(Text, { style: defaultTheme.submitButtonText, children: "Submit Payment" }) })] }));
});
export default PaymentForm;
