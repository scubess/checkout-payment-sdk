// src/networking/api.ts
export const submitPayment = async (cardNumber, expiryDate, cvv, onSubmit, onError) => {
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
                cvv: cvv,
            }),
        });
        const text = await response.text(); // Get response as text
        console.log('Raw Response:', text); // Debug log
        if (!text) {
            // Do not parse if the response is empty
            throw new Error('Empty response from server');
        }
        const data = JSON.parse(text); // Parse manually
        if (response.ok) {
            onSubmit && onSubmit(data);
        }
        else {
            onError && onError(data);
        }
    }
    catch (error) {
        console.error('Error occurred:', error);
        onError && onError(error);
    }
};
