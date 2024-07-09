document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('postList');
    const postDetails = document.getElementById('postDetails');
    const postTitle = document.getElementById('postTitle');
    const postDate = document.getElementById('postDate');
    const postContent = document.getElementById('postContent');
    const commentsSection = document.getElementById('commentsSection');
    const commentsList = document.getElementById('commentsList');
    const commentInput = document.getElementById('commentInput');
    const addCommentBtn = document.getElementById('addCommentBtn');
    const backBtn = document.getElementById('backBtn');
    const addPostSection = document.getElementById('addPostSection');
    const newPostTitle = document.getElementById('newPostTitle');
    const newPostContent = document.getElementById('newPostContent');
    const newPostDate = document.getElementById('newPostDate');
    const addPostBtn = document.getElementById('addPostBtn');

    let posts = [
        { title: 'Primeira Postagem', content: 'Conteúdo da primeira postagem', date: '2024-07-09', comments: [] }
    ];

    function renderPosts() {
        postList.innerHTML = '';
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content.substring(0, 100)}...</p>`;
            postDiv.addEventListener('click', () => showPostDetails(index));
            postList.appendChild(postDiv);
        });
    }

    function showPostDetails(index) {
        const post = posts[index];
        postTitle.textContent = post.title;
        postDate.textContent = `Publicado em: ${post.date}`;
        postContent.textContent = post.content;
        commentsList.innerHTML = '';
        post.comments.forEach(comment => {
            const commentLi = document.createElement('li');
            commentLi.textContent = comment;
            commentsList.appendChild(commentLi);
        });
        postDetails.classList.remove('hidden');
        postList.classList.add('hidden');
        addPostSection.classList.add('hidden');
    }

    backBtn.addEventListener('click', () => {
        postDetails.classList.add('hidden');
        postList.classList.remove('hidden');
        addPostSection.classList.remove('hidden');
    });

    addCommentBtn.addEventListener('click', () => {
        const comment = commentInput.value;
        if (comment) {
            const postIndex = posts.findIndex(post => post.title === postTitle.textContent);
            posts[postIndex].comments.push(comment);
            commentInput.value = '';
            showPostDetails(postIndex);
        }
    });

    addPostBtn.addEventListener('click', () => {
        const title = newPostTitle.value;
        const content = newPostContent.value;
        const date = newPostDate.value;
        if (title && content && date) {
            posts.push({ title, content, date, comments: [] });
            newPostTitle.value = '';
            newPostContent.value = '';
            newPostDate.value = '';
            renderPosts();
        }
    });

    renderPosts();
});
