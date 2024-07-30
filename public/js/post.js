document.getElementById("delete-post-form").addEventListener('submit', handleDeletePost);

async function handleDeletePost(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;

    await fetch(`/api/posts/${id}`, { method: 'DELETE' });

    document.location.replace('/dashboard');
}
