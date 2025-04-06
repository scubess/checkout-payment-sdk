// src/PaymentForm.tsx
import { useState, useImperativeHandle, forwardRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// src/theme/styles.ts
import { StyleSheet } from "react-native";
var defaultTheme = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333"
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});

// src/networking/Validation.tsx
var validateFields = (cardNumber, expiryDate, cvv, touchedFields) => {
  let errors = {};
  if (touchedFields.cardNumber && !/^[0-9]{16}$/.test(cardNumber)) {
    errors.cardNumber = "Invalid card number";
  }
  if (touchedFields.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    errors.expiryDate = "Invalid expiry date";
  }
  if (touchedFields.cvv && !/^[0-9]{3,4}$/.test(cvv)) {
    errors.cvv = "Invalid CVV";
  }
  return errors;
};

// src/networking/PaymentService.tsx
var submitPayment = async (cardNumber, expiryDate, cvv, onSubmit, onError) => {
  try {
    const response = await fetch("https://api.sandbox.checkout.com/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "pk_sbox_6ff46046-30af-41d9-bf58-929022d2cd14"
      },
      body: JSON.stringify({
        type: "card",
        number: cardNumber,
        expiry_month: expiryDate.split("/")[0],
        expiry_year: `20${expiryDate.split("/")[1]}`,
        cvv
      })
    });
    const text = await response.text();
    console.log("Raw Response:", text);
    if (!text) {
      throw new Error("Empty response from server");
    }
    const data = JSON.parse(text);
    if (response.ok) {
      onSubmit && onSubmit(data);
    } else {
      onError && onError(data);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    onError && onError(error);
  }
};

// src/PaymentForm.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var PaymentForm = forwardRef(
  ({ onSubmit, onError }, ref) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touchedFields, setTouchedFields] = useState({
      cardNumber: false,
      expiryDate: false,
      cvv: false
    });
    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit()
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
        cvv: true
      });
      setErrors(validationErrors);
      const isValid = Object.keys(validationErrors).length === 0;
      console.log("isValid", isValid);
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
    return /* @__PURE__ */ jsxs(View, { style: defaultTheme.container, children: [
      /* @__PURE__ */ jsx(Text, { style: defaultTheme.label, children: "Card Number" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          style: defaultTheme.input,
          value: cardNumber,
          onChangeText: setCardNumber,
          onBlur: () => handleBlur("cardNumber"),
          keyboardType: "numeric"
        }
      ),
      touchedFields.cardNumber && errors.cardNumber && /* @__PURE__ */ jsx(Text, { style: defaultTheme.errorText, children: errors.cardNumber }),
      /* @__PURE__ */ jsx(Text, { style: defaultTheme.label, children: "Expiry Date (MM/YY)" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          style: defaultTheme.input,
          value: expiryDate,
          onChangeText: setExpiryDate,
          onBlur: () => handleBlur("expiryDate"),
          keyboardType: "numeric"
        }
      ),
      touchedFields.expiryDate && errors.expiryDate && /* @__PURE__ */ jsx(Text, { style: defaultTheme.errorText, children: errors.expiryDate }),
      /* @__PURE__ */ jsx(Text, { style: defaultTheme.label, children: "CVV" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          style: defaultTheme.input,
          value: cvv,
          onChangeText: setCvv,
          onBlur: () => handleBlur("cvv"),
          keyboardType: "numeric",
          secureTextEntry: true
        }
      ),
      touchedFields.cvv && errors.cvv && /* @__PURE__ */ jsx(Text, { style: defaultTheme.errorText, children: errors.cvv }),
      /* @__PURE__ */ jsx(
        TouchableOpacity,
        {
          style: [
            defaultTheme.submitButton,
            // eslint-disable-next-line react-native/no-inline-styles
            { opacity: isFormValid ? 1 : 0.5 }
          ],
          onPress: handleSubmit,
          disabled: !isFormValid,
          children: /* @__PURE__ */ jsx(Text, { style: defaultTheme.submitButtonText, children: "Submit Payment" })
        }
      )
    ] });
  }
);
var PaymentForm_default = PaymentForm;

// src/index.tsx
function multiply(a, b) {
  return a * b;
}
export {
  PaymentForm_default as PaymentForm,
  defaultTheme,
  multiply,
  submitPayment,
  validateFields
};
