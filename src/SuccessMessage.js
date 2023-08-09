import React from "react";

const SuccessMessage = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <h2>CATALOGUE REQUESTED</h2>
                <p>We have received your catalogue request and our Autumn 2023 Catalogue will be with you shortly. In the meantime, please visit our online catalogue.</p>

                <button onClick={() => window.open('https://blomsbulbs.com/product-category/autumn/', '_blank')}>VISIT OUR ONLINE CATALOGUE</button>

            </div>
        </div>
    )
}

export default SuccessMessage