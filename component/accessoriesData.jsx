'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ImSpinner10 } from "react-icons/im";

const server_route = 'http://localhost:4000'

const AccessoriesData = () => {
  // set different state in a varaible
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAccessories = async () => {
      // fetch data from the server
      try {
        const response = await fetch('http://localhost:4000/api/accessories')
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setAccessoriesData(data)
        console.log(data);     
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
    <div>
      <ul>
        {/* render data gotten from the server */}
        {accessoriesData.map(accessory => (
          <li key={accessory._id}>
            <h2>{accessory.name}</h2>
            <p>{accessory.price}</p>
            <p>{accessory.category}</p>
            <Image src={`http://localhost:4000${accessory.image_url}`} alt={accessory.name} height={300} width={300}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AccessoriesData