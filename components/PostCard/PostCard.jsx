'use client'

export default function PostCard({ post }) {
  return (
    <div>
        <h3>{post.id}. {post.title}</h3>
        <p>{post.body}</p>
        <button onClick={() => alert('Clickeado')}>Click me!</button>
    </div>
  )
}