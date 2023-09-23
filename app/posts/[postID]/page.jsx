async function loadPost(postID) {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
	const data = await response.json()
	return data
}

export default async function page({ params }) {
	const postData = await loadPost(params.postID)

	return (
		<div>
			<h1>{postData.id}. {postData.title}</h1>
			<p>{postData.body}</p>
		</div>
	)
}
