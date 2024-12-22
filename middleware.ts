import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['en', 'zh'];

// Get the preferred locale, similar to the above or using a library
interface Request {
    headers: Headers;
    nextUrl: {
        pathname: string;
    };
}

function getLocale(request: Request): string {
    const referer = request.headers.get('referer');
    
    let languages = ['en']
    // Extract language from Referer URL (if available)
    if (referer) {
        const refererUrl = new URL(referer);
        const refererPathname = refererUrl.pathname;

        // Check if Referer pathname includes a supported locale
        const refererLocale = locales.find((locale) =>
            refererPathname.startsWith(`/${locale}/`) || refererPathname === `/${locale}`
        );

        if (refererLocale) {
            languages = [refererLocale];
        }
    } else {
        let headers = { 'accept-language': 'en-US,en;q=0.5' };
        languages = new Negotiator({ headers }).languages();
    }
    let defaultLocale = 'en';
    return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: Request) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}` || pathname.startsWith('/api/')
    )

    console.log('xxx', pathname)

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl.toString())
}

export const config = {
    matcher: [
        // 匹配所有路径，但排除以下路径：
        '/((?!_next|favicon.ico|api/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2|ttf|otf|eot|ico|map|txt)).*)',
    ],
}