"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const Logo = () => {
    const router = useRouter()
  return (
    <Image
    alt='logo'    
    className='hidden md:block cursor-pointer'
    width={100}
    src="/images/logo.png"
    height={100}
    />
  )
}

export default Logo