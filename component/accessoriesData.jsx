'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ImSpinner5 } from "react-icons/im";

const AccessoriesData = () => {
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/accessories')
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setAccessoriesData(data)
        console.log(setAccessoriesData(data));     
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
    return <div><ImSpinner5 /></div>
  }

  if(error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <ul>
        {accessoriesData.map(accessory => (
          <li key={accessory._id}>
            <h2>{accessory.name}</h2>
            <p>{accessory.price}</p>
            <p>{accessory.category}</p>
            <Image src={accessory.image_url} alt={accessory.name} height={300} width={300}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AccessoriesData