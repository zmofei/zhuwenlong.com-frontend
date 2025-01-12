"use client";

import Pagination from '@/components/Common/Pagination';
import { useLanguage } from '@/components/Context/LanguageContext';

export default function BlogPagination({ blog_page, totalPages, baseURL }: { blog_page: number, totalPages: number, baseURL: string }) {
    const lang = useLanguage().lang
    return (<>
        <div className='py-8 mt-10'>
            <Pagination lang={lang} currentPage={Number(blog_page)} totalPages={totalPages} baseURL={baseURL} anchor='blogList' />
        </div>
    </>)
}