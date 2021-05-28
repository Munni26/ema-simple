import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';
import ProcessPayment from '../ProcessPayment/ProcessPayment';


const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shippingData, setShippingData] = useState(null)
    // const onSubmit = data => {
    //     //console.log('form submitted', data)
    //     const savedCart = getDatabaseCart();
    //     const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };

    //     fetch('https://damp-dusk-26618.herokuapp.com/addOrder', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(orderDetails)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data) {
    //                 processOrder();
    //                 alert('Your order placed successfully');
    //             }
    //         })

    // };

    const onSubmit = data => {
        setShippingData(data);
    };

    const handlePaymentSuccess = paymentID => {
        //console.log('form submitted', data)
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: shippingData,
            paymentID,
            orderTime: new Date()
        };

        fetch('https://damp-dusk-26618.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('Your order placed successfully');
                }
            })
    }

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="row">
            <div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6">
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                    {/* <input defaultValue="test" {...register("example")} />
            <input {...register("exampleRequired", { required: true })} />
            {errors.exampleRequired && <span className="error">This field is required</span>} */}

                    <input defaultValue={loggedInUser.name} placeholder="Your Name" {...register("name", { required: true })} />
                    {errors.name && <span className="error">Name is required</span>}

                    <input defaultValue={loggedInUser.email} placeholder="Your Email" {...register("email", { required: true })} />
                    {errors.email && <span className="error">Email is required</span>}

                    <input placeholder="Your Address" {...register("address", { required: true })} />
                    {errors.address && <span className="error">Address is required</span>}

                    <input placeholder="Your Phone Number" {...register("phone", { required: true })} />
                    {errors.phone && <span className="error">Phone Number is required</span>}


                    <input type="submit" />
                </form>
            </div>
            <div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6">
                <h2>Please Pay for me</h2>
                <ProcessPayment handlePayment = {handlePaymentSuccess}></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;