import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from 'react';

type PaginationProps = {
    lang: string;
    currentPage: number;
    totalPages: number;
    baseURL: string;
    anchor?: string;
    singlePageMode?: boolean; // 支持单页模式
    onPageChange?: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    lang,
    currentPage,
    totalPages,
    baseURL = "/",
    singlePageMode = false,
    anchor,
    onPageChange,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);


    const [_page, setPage] = useState(currentPage);

    const handlePageChange = (page: number) => {
        onPageChange && onPageChange(page);
        setPage(page);
    };

    return (
        <div className="flex justify-center items-center space-x-2 
            mt-2 text-base
            md:mt-4 md:text-xl
        ">
            {/* Previous Button */}
            {_page > 1 && (
                singlePageMode ? (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 rounded bg-[#f05a54] text-white hover:bg-[#f05a54]"
                        onClick={() => handlePageChange(_page - 1)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        {lang == 'zh' ? '上一页' : 'Previous'}
                    </motion.button>
                ) : (
                    <Link href={`${baseURL}/${_page - 1}${anchor ? `#${anchor}` : ''}`}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 rounded bg-[#f05a54] text-white hover:bg-[#f05a54]"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                        >
                            {lang == 'zh' ? '上一页' : 'Previous'}
                        </motion.button>
                    </Link>
                )
            )}

            {/* Page Numbers */}
            <div className="hidden md:flex space-x-2">
                <>
                    {pages.map((page) => (
                        singlePageMode ? (
                            <motion.button
                                key={`${page}_${_page}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.15, delay: page * 0.02 }}
                                whileHover={{
                                    scale: 1.2,
                                    backgroundColor: page === _page ? "#f05a54" : "#dbeafe",
                                }}
                                whileTap={{ scale: 0.9 }}
                                className={`px-4 py-2 rounded 
                                ${page === _page
                                        ? "bg-[#f05a54] text-white"
                                        : "bg-gray-200 text-black hover:bg-gray-300"
                                    }
                            `}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </motion.button>
                        ) : (
                            <Link href={`${baseURL}/${page}${anchor ? `#${anchor}` : ''}`} key={`${page}_${_page}`}>
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.15, delay: page * 0.02 }}
                                    whileHover={{
                                        scale: 1.2,
                                        backgroundColor: page === _page ? "#f05a54" : "#dbeafe",
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-4 py-2 rounded 
                                    ${page === _page
                                            ? "bg-[#f05a54] text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                        }
                                `}
                                >
                                    {page}
                                </motion.button>
                            </Link>
                        )
                    ))}
                </>
            </div>

            <div className="md:hidden px-4">{_page}/{totalPages}</div>

            {/* Next Button */}
            {_page < totalPages && (
                singlePageMode ? (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 rounded bg-[#f05a54] text-white hover:[#f05a54]"
                        onClick={() => handlePageChange(_page + 1)}
                    >
                        {lang == 'zh' ? '下一页' : 'Next'}
                    </motion.button>
                ) : (
                    <Link href={`${baseURL}/${_page + 1}${anchor ? `#${anchor}` : ''}`}>
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 rounded bg-[#f05a54] text-white hover:[#f05a54]"
                        >
                            {lang == 'zh' ? '下一页' : 'Next'}
                        </motion.button>
                    </Link>
                )
            )}
        </div>
    );
};

export default Pagination;