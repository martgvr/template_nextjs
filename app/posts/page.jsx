import './posts.css'
import PostCard from "@/components/PostCard/PostCard"

async function loadPosts() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts")
	const data = await res.json()

	await new Promise((resolve) => setTimeout(resolve, 2000))

	return data
}

export default async function PostPage() {
	const posts = await loadPosts()

	return (
		<div className='postsContainer'>
			{
                posts.map((post) => 
                    <PostCard key={post.id} post={post} />
			    )
            }
		</div>
	)
}