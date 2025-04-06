# Checkout Payment SDK

Checkout Payment SDK is a React Native library for capturing and validating card details using Checkout.com's Tokens API. It supports UI customization, localization, and external submission.

## Features

- Capture and validate card details
- Supports UI customization
- Localization support
- Easy integration with React Native apps
- Supports secure API connections with native SDK integration

## Installation

You can install the package using yarn:

```sh
yarn add checkout-payment-sdk
```

or using npm:

```sh
npm install checkout-payment-sdk
```

## Running the Example App

The repository includes an example app to demonstrate how to use the SDK.

### Prerequisites

Make sure you have the following installed:

- Node.js
- Yarn package manager
- Expo CLI (if running on Expo)

### Steps to Run

1. Clone the repository:

   ```sh
   git clone https://github.com/scubess/checkout-payment-sdk.git
   cd checkout-payment-sdk
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Navigate to the example app directory:

   ```sh
   cd example
   ```

4. Install example app dependencies:

   ```sh
   yarn install
   ```

5. Start the example app:

   ```sh
   yarn start
   ```

   You can run it on an Android emulator or iOS simulator using:

   ```sh
   yarn android
   yarn ios
   ```

## Packaging and Installing the Library in an External App

### Option 1: Using Yarn Pack

#### Packaging the Library

To package the library into a `.tgz` file, run the following command:

```sh
yarn pack
```

This will generate a tarball file (e.g., `checkout-payment-sdk-v1.0.1.tgz`).

#### Installing the Library in an External App

1. Copy the generated `.tgz` file to your external app directory.
2. Navigate to your external app’s root folder and run:

   ```sh
   yarn add file:./checkout-payment-sdk-v1.0.1.tgz
   ```

   Alternatively, using npm:

   ```sh
   npm install ./checkout-payment-sdk-v1.0.1.tgz
   ```

3. Import the SDK in your React Native app:

   ```tsx
   import CheckoutPaymentSDK from 'checkout-payment-sdk';
   ```

4. Use it in your component:

   ```tsx
   const PaymentScreen = () => {
     return <CheckoutPaymentSDK />;
   };
   ```

### Testing

To ensure the integrity of the SDK, validation and networking tests are included under src/ ** tests **.

Run the tests using:

```tsx
yarn jest
```

or

```tsx
yarn test
```

### Option 2: Integrating Native iOS & Android SDKs ( not include in the test )

To enhance security, you can integrate Checkout.com's native SDKs to handle API connections securely and prevent man-in-the-middle attacks using certificate pinning.

#### Steps to Integrate

1. **Install the native SDKs in to RN SDK:**

   - For iOS, add the Checkout SDK to your `PodSpec`
   - For Android, add the SDK dependency to your `build.gradle`.

2. **Modify Native Modules:**

   - Create a bridge between React Native and the native SDKs using Native Modules.
   - Implement iOS ReactNative and Android inteceptor flavor to implement public methods.

3. **Update React Native Integration:**
   - Use the native module in your React Native integrator app.

Example:

```tsx
import { NativeModules } from 'react-native';
const { CheckoutNativeSDK } = NativeModules;

const handlePayment = async () => {
  try {
    const response = await CheckoutNativeSDK.processPayment({
      cardNumber,
      expiry,
      cvv,
    });
    console.log('Payment successful:', response);
  } catch (error) {
    console.error('Payment failed:', error);
  }
};
```

### Related Work

I have also created a similar native structure not only for tokenization but also for handling biometrics and Strong Customer Authentication (SCA) verification. You can check out my work on:

- **Secure Components SDK**: Provides biometric authentication and SCA verification for React Native apps. [View on npm](https://www.npmjs.com/package/@weavr-io/secure-components-react-native?activeTab=code)
- **Push Provisioning SDK**: Integrates with card providers for secure push provisioning in React Native apps. [View on npm](https://www.npmjs.com/package/@weavr-io/push-provisioning-react-native?activeTab=code)

## Author

Selva
