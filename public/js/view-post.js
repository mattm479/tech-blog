document.getElementById("add-comment-form").addEventListener('submit', handleAddComment);

async function handleAddComment(event) {
    event.preventDefault();

    const comment = document.getElementById('comment').value.trim();
    const postId = document.getElementById('postId').value;

    try {
        await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ content: comment, post_id: postId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.replace('/dashboard');
    } catch (err) {
        console.error(err);
    }
}