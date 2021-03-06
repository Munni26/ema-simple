import React, { useState, useEffect } from 'react';
//import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Shop = () => {
    //const first10 = fakeData.slice(0, 10);
    //const [products, setProducts] = useState(first10);
    const [products, setProducts] = useState([]);
    // console.log(products)
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState([]);
    document.title = "Shop More"

    useEffect(() => {
        fetch('https://damp-dusk-26618.herokuapp.com/products?search=' + search)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                //console.log(data)

            })

    }, [search])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://damp-dusk-26618.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
        // console.log(products, productKeys)
        // if (products.length) {
        //     const previousCart = productKeys.map(existingKey => {
        //         // const product = fakeData.find(pd => pd.key === existingKey);
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
    }, [])

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} placeholder="Search" className="product-search" />
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;