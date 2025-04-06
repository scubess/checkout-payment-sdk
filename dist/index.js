'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  PaymentForm: () => PaymentForm_default,
  defaultTheme: () => defaultTheme,
  multiply: () => multiply,
  submitPayment: () => submitPayment,
  validateFields: () => validateFields,
});
module.exports = __toCommonJS(index_exports);

// src/PaymentForm.tsx
var import_react = require('react');
var import_react_native2 = require('react-native');

// src/theme/styles.ts
var import_react_native = require('react-native');
var defaultTheme = import_react_native.StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#0057FF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// src/networking/Validation.tsx
var validateFields = (cardNumber, expiryDate, cvv, touchedFields) => {
  let errors = {};
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

// src/networking/PaymentService.tsx
var submitPayment = async (cardNumber, expiryDate, cvv, onSubmit, onError) => {
  try {
    const response = await fetch('https://api.sandbox.checkout.com/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'pk_sbox_6ff46046-30af-41d9-bf58-929022d2cd14',
      },
      body: JSON.stringify({
        type: 'card',
        number: cardNumber,
        expiry_month: expiryDate.split('/')[0],
        expiry_year: `20${expiryDate.split('/')[1]}`,
        cvv,
      }),
    });
    const text = await response.text();
    console.log('Raw Response:', text);
    if (!text) {
      throw new Error('Empty response from server');
    }
    const data = JSON.parse(text);
    if (response.ok) {
      onSubmit && onSubmit(data);
    } else {
      onError && onError(data);
    }
  } catch (error) {
    console.error('Error occurred:', error);
    onError && onError(error);
  }
};

// src/PaymentForm.tsx
var import_jsx_runtime = require('react/jsx-runtime');
var PaymentForm = (0, import_react.forwardRef)(({ onSubmit, onError }, ref) => {
  const [cardNumber, setCardNumber] = (0, import_react.useState)('');
  const [expiryDate, setExpiryDate] = (0, import_react.useState)('');
  const [cvv, setCvv] = (0, import_react.useState)('');
  const [errors, setErrors] = (0, import_react.useState)({});
  const [isFormValid, setIsFormValid] = (0, import_react.useState)(false);
  const [touchedFields, setTouchedFields] = (0, import_react.useState)({
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });
  (0, import_react.useImperativeHandle)(ref, () => ({
    submit: () => handleSubmit(),
  }));
  const handleBlur = (field) => {
    setTouchedFields((prevTouchedFields) => {
      const updatedTouchedFields = { ...prevTouchedFields, [field]: true };
      const updatedErrors = validateFields(
        cardNumber,
        expiryDate,
        cvv,
        updatedTouchedFields
      );
      setErrors(updatedErrors);
      const isValid = Object.keys(updatedErrors).length === 0;
      setIsFormValid(isValid);
      return updatedTouchedFields;
    });
  };
  const handleValidation = () => {
    const validationErrors = validateFields(cardNumber, expiryDate, cvv, {
      cardNumber: true,
      expiryDate: true,
      cvv: true,
    });
    setErrors(validationErrors);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_native2.View,
    {
      style: defaultTheme.container,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, {
          style: defaultTheme.label,
          children: 'Card Number',
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react_native2.TextInput,
          {
            style: defaultTheme.input,
            value: cardNumber,
            onChangeText: setCardNumber,
            onBlur: () => handleBlur('cardNumber'),
            keyboardType: 'numeric',
          }
        ),
        touchedFields.cardNumber &&
          errors.cardNumber &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react_native2.Text,
            { style: defaultTheme.errorText, children: errors.cardNumber }
          ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, {
          style: defaultTheme.label,
          children: 'Expiry Date (MM/YY)',
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react_native2.TextInput,
          {
            style: defaultTheme.input,
            value: expiryDate,
            onChangeText: setExpiryDate,
            onBlur: () => handleBlur('expiryDate'),
            keyboardType: 'numeric',
          }
        ),
        touchedFields.expiryDate &&
          errors.expiryDate &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react_native2.Text,
            { style: defaultTheme.errorText, children: errors.expiryDate }
          ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, {
          style: defaultTheme.label,
          children: 'CVV',
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react_native2.TextInput,
          {
            style: defaultTheme.input,
            value: cvv,
            onChangeText: setCvv,
            onBlur: () => handleBlur('cvv'),
            keyboardType: 'numeric',
            secureTextEntry: true,
          }
        ),
        touchedFields.cvv &&
          errors.cvv &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react_native2.Text,
            { style: defaultTheme.errorText, children: errors.cvv }
          ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react_native2.TouchableOpacity,
          {
            style: [
              defaultTheme.submitButton,

              { opacity: isFormValid ? 1 : 0.5 },
            ],
            onPress: handleSubmit,
            disabled: !isFormValid,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_react_native2.Text,
              {
                style: defaultTheme.submitButtonText,
                children: 'Submit Payment',
              }
            ),
          }
        ),
      ],
    }
  );
});
var PaymentForm_default = PaymentForm;

// src/index.tsx
function multiply(a, b) {
  return a * b;
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    PaymentForm,
    defaultTheme,
    multiply,
    submitPayment,
    validateFields,
  });
