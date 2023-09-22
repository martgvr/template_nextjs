import Navbar from "@/components/Navbar/Navbar"
import { Open_Sans as Font } from 'next/font/google'

export const metadata = {
    title: 'Título de la página',
    description: 'Descripción de la página',
}

const customFont = Font({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={customFont.className}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
