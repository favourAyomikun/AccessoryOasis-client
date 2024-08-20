'use client'

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ImSpinner10 } from "react-icons/im";

const AccessoriesList = () => {
  // set different state in a varaible
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // fetch data from the server
    const fetchAccessories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/accessories')
        setAccessoriesData(response.data)
        console.log(response.data);     
        setLoading(false)   
      } catch (error) {
        console.error('Error fetching accessories', error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchAccessories()
  }, [])

  if(loading) {
    return <ImSpinner10 className='animate-spin text-[100px] text-center'/>
  }

  if(error) {
    return <div>Error: {error}</div>
  }

  return (
    // render data gotten from the server
     <div>
        <h2>Available Accessories</h2>
       <div className='grid grid-cols-3'>
        {accessoriesData.map(accessory => (
          <div key={accessory._id} className='border-2 border-red-400 h-44'>
            <Image src={`http://localhost:4000${accessory.image_url}`} alt={accessory.name} height={300} width={300}/>
            <div>
            <h2>{accessory.name}</h2>
            <p>{accessory.price}</p>
            <p>{accessory.category}</p>
            </div>
          </div>
        ))}
      </div>
     </div>
  )
}

export default AccessoriesList