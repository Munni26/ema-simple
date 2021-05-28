import React from 'react';
//import fakeData from '../../fakeData';
// console.log(fakeData);
const Inventory = () => {
    // const handleAddProduct = () => {
    //     fetch('https://damp-dusk-26618.herokuapp.com/addProduct', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(fakeData)

    //     })
    // }

    const handleAddProduct = () => {
        const product = {};
        fetch('https://damp-dusk-26618.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)

        })
    }

    return (
        <div>
            <form action="">
                <p><span>Name:  </span><input type="text" /></p>
                <p><span>Price: </span><input type="text" /></p>
                <p><span>Quantity: </span><input type="text" /></p>
                <p><span>Product Image</span><input type="file" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;