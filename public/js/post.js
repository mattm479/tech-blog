async function handleDeletePost(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;

    await fetch(`/api/posts/${id}`, { method: 'DELETE' });

    document.location.replace('/dashboard');
}

async function handleShowAddComment(event) {
    event.preventDefault();

    const cardDiv = document.getElementById('comment-div');
    cardDiv.classList.remove('display-none');
}
