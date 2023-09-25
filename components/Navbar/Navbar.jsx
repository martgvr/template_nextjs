import './Navbar.css'
import Link from "next/link"

export default function Navbar() {
	return (
		<div className='navbar'>
			<h1>LOGO</h1>
			
			<div className='navbar-items'>
				<Link href="/">Root</Link>
				<Link href="/posts">Posts</Link>
				<Link href="/about">About</Link>
			</div>
		</div>
	)
}
