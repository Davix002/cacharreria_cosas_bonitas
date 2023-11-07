const orderStatus = "Enviado"; 
const paymentMethod = "Visa"; 
const address = " 852 Theodore Roosevelt Rd"
const city = "Springfield"

export default function Order() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center px-2 pt-10 font-bold tracking-tight text-gray-900 sm:text-4xl">
        Detalles de la compra
      </h1>

      <div className="mt-8 lg:grid  lg:items-start lg:gap-x-12 xl:gap-x-16">
        {/* Detalles de carrito */}
        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
          <h2 id="summary-heading" className="border-b border-gray-200 px-2 py-4 font-medium">
           <b>Detalles del precio</b>
          </h2>

          <dl className="px-6 py-4 flex justify-between">
            <ul className='items-comprados'>
              <li> Articulo 1</li>
              <li> Articulo 2</li>
              <li> Articulo 3</li>
            </ul>
            <ul className='items-precio'>
              <li> $10.00</li>
              <li> $20.00</li>
              <li> $30.00</li>
            </ul>
          </dl>
          <div className="px-2 pb-4 font-medium text-green-700 text-center">
            Su pago fue por $60.00
          </div>
        </section>
      </div>


      <div className='mt-8 lg:grid  lg:items-start lg:gap-x-12 xl:gap-x-16'>

        {/* Bloque de Detalles del envio */}
        <section aria-labelledby="cart-heading" className="rounded-lg pb-6 lg:col-span-8">
          <h2 id="summary-heading" className="border-b border-gray-200 px-2 py-4  ">
          <b>Detalles del envio </b>
          </h2>
          <div>
            <dl className="px-6 py-4 flex justify-between">
            <ul className='items-comprados  '>
              <li className='font-medium'>Ciudad: </li>
              <li className='font-medium'>Dirreción: </li>
              <li className='font-medium'>Estado de la orden:</li>
              <li className='font-medium'>Metodo de pago: </li>
            </ul>
            <ul className='items-precio'>
              <li> {city}</li>
              <li> {address}</li>
              <li>  {orderStatus}</li>
              <li>  {paymentMethod}</li>
            </ul>
            </dl>
            <div className="px-2 py-4 font-medium text-green-700 text-center">
              Enviado
            </div>
          </div>

        </section>
      </div>

    </div>


  );
}
