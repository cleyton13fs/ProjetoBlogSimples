document.addEventListener("DOMContentLoaded", function() {
    const postList = document.getElementById('post-list');
    const newPostForm = document.getElementById('new-post-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const postDetailsModal = document.getElementById('post-details-modal');
    const closeLoginBtn = document.querySelector('.close-btn');
    const closeSignupBtn = document.querySelector('.close-signup-btn');
    const closeDetailsBtn = document.querySelector('.close-details-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const newCommentForm = document.getElementById('new-comment-form');
    const commentInput = document.getElementById('comment');

    const detailsTitle = document.getElementById('details-title');
    const detailsDate = document.getElementById('details-date');
    const detailsContent = document.getElementById('details-content');
    const commentsList = document.getElementById('comments-list');

    let posts = [];

    function displayPosts() {
        postList.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3 data-index="${index}">${post.title}</h3>
                <p>${post.content.substring(0, 100)}...</p>
                <p>Publicado em: ${post.date}</p>
            `;
            postList.appendChild(postElement);
        });
    }

    newPostForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleInput.value;
        const content = contentInput.value;
        const date = new Date().toLocaleDateString();

        posts.push({ title, content, date, comments: [] });
        titleInput.value = '';
        contentInput.value = '';
        displayPosts();
    });

    postList.addEventListener('click', function(event) {
        if (event.target.tagName === 'H3') {
            const index = event.target.getAttribute('data-index');
            const post = posts[index];

            detailsTitle.textContent = post.title;
            detailsDate.textContent = `Publicado em: ${post.date}`;
            detailsContent.textContent = post.content;
            displayComments(post.comments);

            postDetailsModal.style.display = 'block';
            newCommentForm.setAttribute('data-index', index);
        }
    });

    function displayComments(comments) {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<p>${comment}</p>`;
            commentsList.appendChild(commentElement);
        });
    }

    newCommentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const comment = commentInput.value;
        const index = newCommentForm.getAttribute('data-index');

        posts[index].comments.push(comment);
        commentInput.value = '';
        displayComments(posts[index].comments);
    });

    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    signupBtn.addEventListener('click', function() {
        signupModal.style.display = 'block';
    });

    closeLoginBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    closeSignupBtn.addEventListener('click', function() {
        signupModal.style.display = 'none';
    });

    closeDetailsBtn.addEventListener('click', function() {
        postDetailsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target == signupModal) {
            signupModal.style.display = 'none';
        }
        if (event.target == postDetailsModal) {
            postDetailsModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        alert(`Login efetuado com o email: ${email}`);
        loginModal.style.display = 'none';
    });

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        alert(`Conta criada para o email: ${email}`);
        signupModal.style.display = 'none';
    });

    displayPosts();
});
