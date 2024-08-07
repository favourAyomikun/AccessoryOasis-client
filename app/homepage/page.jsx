import { Kelly_Slab, Taviraj } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const kellyslab = Kelly_Slab({ subsets: ['latin'], weight: '400'})
const taviraj = Taviraj({ subsets: ['latin'], weight: '300'})

export default function HomePage() {
  return (
    <main className={`${taviraj.className} bg-[#E5E5E5] h-screen w-full pt-6`}>
      <h1 className={`${kellyslab.className} text-[#d84727] border border-blue-400 text-center text-[33px]` }>AccessoryOasis</h1>

      <section className='container w-[80%] py-10 mx-auto flex items-center justify-around bg-[#F1DDC9] border border-blue-400 mt-12 rounded-md'>
        <h2 className='flex text-center text-[#333333] w-[40%] font-semibold tracking-wide leading-8 text-xl'>Discover Your Perfect Accessory at AccessoryOasis, Where Every Piece Enhances Your Unique Style.</h2>
        <Image src='/applewatch_animation.gif ' height={350} width={350} className='rounded-xl'/>
      </section>
    </main>
  )
}
