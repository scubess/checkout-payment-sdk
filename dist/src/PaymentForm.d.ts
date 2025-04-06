interface PaymentFormProps {
    onSubmit: (data: any) => void;
    onError: (error: any) => void;
    theme?: object;
    translations?: Record<string, string>;
}
declare const PaymentForm: import("react").ForwardRefExoticComponent<PaymentFormProps & import("react").RefAttributes<unknown>>;
export default PaymentForm;
