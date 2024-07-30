document.getElementById("edit-post-form").addEventListener('submit', handleEditPost);

async function handleEditPost(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace("/dashboard");
}
