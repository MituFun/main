"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { ChevronRight } from 'lucide-react';

type PageContent = {
    zh: {
        content: string;
        subContent?: string;
        links?: { text: string; url: string }[];
    };
    en: {
        content: string;
        subContent?: string;
        links?: { text: string; url: string }[];
    };
};

export function LanguageAdaptiveNavigation() {
    const [currentPage, setCurrentPage] = useState(0);
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const userLanguage = navigator.language.split('-')[0];
        setLanguage(userLanguage === 'zh' ? 'zh' : 'en');

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                setCurrentPage(prev => Math.min(prev + 1, pages.length - 1));
            } else if (event.key === 'ArrowLeft') {
                setCurrentPage(prev => Math.max(prev - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        setShowHint(false);
        const timer = setTimeout(() => {
            setShowHint(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentPage]);

    const handleWheel = (event: React.WheelEvent) => {
        if (event.deltaY > 0 && currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else if (event.deltaY < 0 && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentPage(prev => Math.min(prev + 1, pages.length - 1)),
        onSwipedRight: () => setCurrentPage(prev => Math.max(prev - 1, 0)),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    const pages: PageContent[] = [
        {
            zh: { content: "�ˣ�����������" },
            en: { content: "Hi there!" }
        },
        {
            zh: { content: "�������ʶ��������˹顣", subContent: "���� MituFun" },
            en: { content: "Hello, nice to meet you.", subContent: "I'm MituFun" }
        },
        {
            zh: {
                content: "���˽��ҵİ��ã�",
                subContent: "�����ͨ���ҵĲ���",
                links: [
                    { text: "���˲���", url: "https://blog.mitufun.top" },
                    { text: "����԰", url: "https://www.cnblogs.com/luogu-int64" },
                    { text: "��Ȳ���", url: "https://www.luogu.com.cn/user/670262#article" },
                ]
            },
            en: {
                content: "Wanna know my hobbies?",
                subContent: "You can find out on my blog",
                links: [
                    { text: "Personal Blog", url: "https://blog.mitufun.top" },
                    { text: "CNBlogs", url: "https://www.cnblogs.com/luogu-int64" },
                    { text: "Luogu Blog", url: "https://www.luogu.com.cn/user/670262#article" }
                ]
            }
        },
        {
            zh: {
                content: "��Ȼ��Ҳ����ͨ��һЩ�˺�",
                links: [
                    { text: "GitHub", url: "https://github.com/MituFun" },
                    { text: "Instagram", url: "https://www.instagram.com/mitufun123/" },
                    { text: "Twitter", url: "https://x.com/William3086342" }
                ]
            },
            en: {
                content: "You can also check through some accounts",
                links: [
                    { text: "GitHub", url: "https://github.com/MituFun" },
                    { text: "Instagram", url: "https://www.instagram.com/mitufun123/" },
                    { text: "Twitter", url: "https://x.com/William3086342" }
                ]
            }
        },
        {
            zh: {
                content: "�����һ���棿",
                subContent: "�� Minecraft ����������",
                links: [
                    { text: "�ҵ� Minecraft ������", url: "https://yuxincraft.mitufun.top" },
                ]
            },
            en: {
                content: "Wanna play games with me?",
                subContent: "Meet me in Minecraft",
                links: [
                    { text: "My Minecraft Server", url: "https://yuxincraft.mitufun.top" },
                ]
            }
        },
        {
            zh: {
                content: "�ڴ��ټ���",
            },
            en: {
                content: "See you.",
            }
        }
    ];

    return (
        <div
            className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white"
            onWheel={handleWheel}
            {...handlers}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full flex flex-col items-center justify-center px-4"
                >
                    <h1 className="text-6xl font-bold mb-4 text-center text-glow">
                        {pages[currentPage][language].content}
                    </h1>
                    <p className="text-xl mb-8 text-center text-gray-300 text-glow-subtle">
                        {pages[currentPage][language].subContent}
                    </p>
                    {pages[currentPage][language].links && (
                        <div className="flex flex-col items-center space-y-4">
                            {pages[currentPage][language].links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className="px-6 py-3 bg-white bg-opacity-10 rounded-full text-lg hover:bg-opacity-20 transition-all duration-300"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                    {pages.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-white shadow-glow' : 'bg-gray-500'}`}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                Developed by MituFun
            </div>
            <AnimatePresence>
                {showHint && currentPage < pages.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 p-2 rounded-full"
                    >
                        <ChevronRight className="w-6 h-6 text-white animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}