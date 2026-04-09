import { NextRequest, NextResponse } from "next/server";



export function Get(req:NextRequest){
    const users=[
        {id:1, name:'ali'},
        {id:2, name:'ahmed'},
    ]

    return NextResponse.json({users, status:200})
}