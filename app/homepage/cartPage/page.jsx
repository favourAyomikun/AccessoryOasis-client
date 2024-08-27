'use client'

import React, { useContext } from 'react';
import { ShopAccessoryContext } from '@/context/ShopAccessoryContext';
import Link from 'next/link';

const CartPage = () => {
  const { cartAccessoryItems, removeFromCart, getTotalCartAmount, accessoriesData } = useContext(ShopAccessoryContext);
  const totalAmount = getTotalCartAmount();

  return (
    <section>
    <div className='pt-[105px]'>
      <h1 className='text-center text-lg md:text-2xl font-bold'>Your Cart</h1>
      <table className='container mx-auto table-fixed border-separate border-spacing-2 border-2 rounded-lg border-gray-200 shadow-md'>
        {cartAccessoryItems.map((itemId) => {
          if (cartAccessoryItems[itemId] > 0) {
            const item = accessoriesData.find((i) => i._id === itemId);
            return (
              <tbody key={itemId}>
                <tr>
                  <td>
                    <img src={`http://localhost:4000${item.image_url}`} alt={item.name} className='w-48 h-20 md:h-40 rounded-lg object-cover'/>
                  </td>
                  <td className='md:text-lg font-medium md:font-semibold'>{item.name}</td>
                  <td className='text-sm md:text-base font-semibold'>{item.category}</td>
                  <td className='text-sm font-medium md:font-semibold md:tracking-wide'>${item.price}</td>
                  <td className=''>
                    <button onClick={() => removeFromCart(item._id)} className='bg-gray-400 px-[6px] w-[19px] rounded-sm font-semibold'>-</button>
                    <input type="number" className='w-1/4 outline-none border rounded text-center' value={cartAccessoryItems[item._id]} readOnly/>
                    <button onClick={() => addToCart(item._id)} className='bg-gray-400 px-[4px] text-center rounded-sm font-semibold'>+</button>
                  </td>
                </tr>
              </tbody>
            );
          }
        })}
      </table>
      {totalAmount > 0 ? 
        <main className='container mx-auto w-[30%] mt-2'>
          <div className='border-t border-black w-[100%]'></div>
          <div>
            <p className='font-medium md:font-semibold mb-1'>SubTotal: ${totalAmount}</p>
            <Link href={'/homepage'}>
              <button className='block text-center bg-gray-800 px-2 py-2 md:py-2 leading-none rounded text-white text-sm'>Continue Shopping</button>
            </Link>
          </div> 
        </main> 
        : <h1 className='text-center text-lg md:text-2xl font-bold'>Your Cart is Empty</h1>
      }
    </div>
  </section>
  );
}

export default CartPage;
