import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitForm from './SplitForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51ItupwA6XahVmXxsMv03sqfdKZ9fbZ6zGMRyH7imEpzUVBTx196Krz0JygKSlMO2v3bkhVPHU6trBEFopbpYOqGe00Ztbp2gWx');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
}
export default ProcessPayment