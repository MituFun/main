"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head';

export function LanguageAdaptiveNavigation() {
	const [currentPage, setCurrentPage] = useState(0)
	const [language, setLanguage] = useState('en')

	useEffect(() => {
		const userLanguage = navigator.language.split('-')[0]
		setLanguage(userLanguage === 'zh' ? 'zh' : 'en')
	}, [])

	const handleWheel = (event: React.WheelEvent) => {
		if (event.deltaY > 0 && currentPage < pages.length - 1) {
			setCurrentPage(currentPage + 1)
		} else if (event.deltaY < 0 && currentPage > 0) {
			setCurrentPage(currentPage - 1)
		}
	}

	const pages = [
		{
			zh: { content: "嗨，别来无恙啊。" },
			en: { content: "Hi there!" }
		},
		{
			zh: { content: "与君初相识，犹如故人归。", subContent: "我是 MituFun" },
			en: { content: "Hello, nice to meet you.", subContent: "I'm MituFun" }
		},
		{
			zh: {
				content: "想了解我的爱好？",
				subContent: "你可以通过我的博客",
				links: [
					{ text: "个人博客", url: "https://blog.mitufun.top" },
					{ text: "博客园", url: "https://www.cnblogs.com/luogu-int64" },
					{ text: "洛谷博客", url: "https://www.luogu.com.cn/user/670262#article" },
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
				content: "当然，也可以通过一些账号",
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
				content: "想和我一起玩？",
				subContent: "在 Minecraft 中与我相遇",
				links: [
					{ text: "我的 Minecraft 服务器", url: "https://yuxincraft.mitufun.top" },
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
				content: "期待再见。",
			},
			en: {
				content: "See you.",
			}
		}
	]

	return (
		<div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white" onWheel={handleWheel}>
			<Head>
				<title>MituFun</title>
			</Head>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentPage}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
					className="h-full w-full flex flex-col items-center justify-center px-4"
				>
					<h1 className="text-6xl font-bold mb-4 text-center">{pages[currentPage][language].content}</h1>
					<p className="text-xl mb-8 text-center text-gray-300">{pages[currentPage][language].subContent}</p>
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
							className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-white' : 'bg-gray-500'
								}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}