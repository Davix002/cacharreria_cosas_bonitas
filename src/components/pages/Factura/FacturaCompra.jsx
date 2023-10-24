import { Heart, Trash } from 'lucide-react' 
import React from 'react' 
import { Link } from "react-router-dom"; 


const orderStatus = "Currently Shipping"; 
const paymentMethod = "Visa"; 
const address = " 852 Theodore Roosevelt Rd"
const city = "Springfield"


export default function FacturaCompra() {
  return (
    <div className="mx-auto max-w-7xl px-28 lg:px-0 flex justify-center">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Detailed Purchase
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">

          {/* Detalles de carrito */}

          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">
              Price Details
            </h2>
            <div>
              <dl className="px-2 py-4" style={{display: "flex", justifyContent: "space-between"}}>
                <ul className='items-comprados'>
                  <li> Item 1</li>
                  <li> Item 2</li>
                  <li> Item 3</li>
                </ul>
                <ul className='items-precio'>
                <li> $10.00</li>
                <li> $20.00</li>
                <li> $30.00</li>
                </ul>
                {/* Detalles del resumen del pedido */}
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700" style={{textAlign: "center"}}>
                You will save $13.05 on this order
              </div>
            </div>
          </section>
        </form>


        
        <fieldset>
          <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">
            Order Details
          </h2>
          <div>
            <dl className="space-y-1 px-2 py-4">
              <p><b>City:</b> {city}</p>
              <p><b>Address:</b> {address}</p>
              <p><b>Order Status:</b> {orderStatus}</p>
              <p><b>Payment Method:</b> {paymentMethod}</p>
              {/* Detalles de envío, como dirección, departamento, municipio, etc. */}
            </dl>
            <div className="px-2 pb-4 font-medium text-green-700">
              Your order will arrive in 2 Days
            </div>
          </div>
          <div className="flex items-center justify-between border-y border-dashed py-4">

          </div>
        </fieldset>
      </div>
    </div>
  );
}
