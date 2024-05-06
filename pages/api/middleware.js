import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { NetworkStatus } from "@apollo/client";

const secret = process.env.TOKEN_SECRET;



export default function middleware(req) {


    const { cookies } = req;

    const jwt = cookies.OutsiteJWT;
    const url = req.url;


    if (url.includes("/page/account/cart")) {

        if (jwt === undefined) {
            return NextResponse.redirect('/')
        }
        try {
            verify(jwt.secret)
            return NextResponse.next()
        } catch(error) {
            return NextResponse.redirect('/')

        }
    }
}