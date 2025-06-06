import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useState } from 'react';

interface CheckoutProps {
  roundedTotalPrice: number;
}

const Checkout: React.FC<CheckoutProps> = ({ roundedTotalPrice }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: roundedTotalPrice.toString(),
                        currency_code: "EUR",
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data: any,actions: any) => {
    return actions.order.capture().then((details: any) => {
    const name = details.payer.name.given_name;
        alert(`Transaction completed by ${name}`);
    });
    }

    return (
        <div>
            {isPending ? <p>LOADING...</p> : (
                <>
                <select value={currency} onChange={onCurrencyChange} hidden>
                    <option value="USD">💵 USD</option>
                    <option value="EUR" >💶 Euro</option>
                </select>
                <PayPalButtons 
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    )
}

export default Checkout;
