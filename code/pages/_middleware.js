import { NextResponse } from 'next/server'

export function middleware(req, ev) {
    const url = req.nextUrl.pathname;
    // 
    if (url === '/blog/' || url === '/blog') {
        return NextResponse.redirect(new URL('/blog/1', req.url))
    } else {
        return NextResponse.next();
    }
}