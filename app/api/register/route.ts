
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"
import bcrypt from 'bcrypt'
export const POST=async(req:NextRequest)=>{
    const body = await req.json() 
    const {email,name,password} = body
    const doesUserExists = await prisma.user.findUnique({
        where:{
          email
        }
      })
      if (doesUserExists) {
        return NextResponse.json({message:"Account already registered"},{status:409})
      }


    const hashedPassword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data:{
            email,
            hashedPassword,
            name
        }
    })
    return NextResponse.json({message:"Congratulations! 🎉 You've successfully registered",user},{status:200})
}