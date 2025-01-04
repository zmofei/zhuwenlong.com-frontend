import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'


let locales = ['en', 'zh'];

// Get the preferred locale, similar to the above or using a library

function getLocale(request: NextRequest): string {
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
    } else if (request.headers.has('cookie')) {
        // get language from cookie
        let lang = request.cookies.get('lang');
        if (lang && lang.value && locales.includes(lang.value)) {
            languages = [lang.value]
        }

    } else {
        let headers = { 'accept-language': 'en-US,en;q=0.5' };
        languages = new Negotiator({ headers }).languages();
    }
    let defaultLocale = 'en';
    return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}` || pathname.startsWith('/api/')
    )

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
        '/((?!_next|favicon.ico|api/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2|ttf|otf|eot|ico|map|txt|xml)).*)',
    ],
}