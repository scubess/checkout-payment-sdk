import { SafeAreaView, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { PaymentForm } from 'checkout-payment-sdk';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const handleSubmit = (data: any) => {
    // Handle the successful submission of the payment form
    setToken(data.token);
    console.log('Token received:', data);
    // Show success alert
    Alert.alert(
      'Payment Successful',
      `Token received: ${data.token}`, // Adjust based on actual data structure
      [{ text: 'OK' }]
    );
  };

  const handleError = (error: any) => {
    // Handle any error that occurs during tokenization
    setError(error);
    console.log('Error occurred:', error);
    // Show failure alert
    Alert.alert(
      'Payment Failed',
      `Error: ${error.message || 'An error occurred'}`, // Adjust based on actual error structure
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Text>React Native Payment SDK</Text>
        <PaymentForm
          onSubmit={handleSubmit}
          onError={handleError}
          translations={{
            cardNumber: 'Card Number',
            expiryDate: 'Expiry Date (MM/YY)',
            cvv: 'CVV',
            submit: 'Submit Payment',
          }}
        />
        {token && <Text>Token: {token}</Text>}
        {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}
      </View>
    </SafeAreaView>
  );
}
