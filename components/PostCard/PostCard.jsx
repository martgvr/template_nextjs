'use client'

import './PostCard.css'
import Link from "next/link"

export default function PostCard({ post }) {
  return (
    <div className='postCard'>
        <Link href={`/posts/${post.id}`}>
            <h3>{post.id}. {post.title}</h3>
        </Link>

        <p>{post.body}</p>
        <button onClick={() => alert('Clickeado')}>Click me!</button>
    </div>
  )
}