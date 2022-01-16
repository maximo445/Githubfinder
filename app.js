const userInput = document.getElementById('user-name');
const userProfile = document.getElementById('user-profile');
const title = document.getElementById('latest-repos-title');
const userRepos = document.getElementById('user-repos');

userProfile.style.display = 'none';
title.style.display = 'none';
userRepos.style.display = 'none';

const http = new HTTPLibrary();

const displayUser = new DisplayUser();

userInput.addEventListener('keyup', (e) => {
    const userText = e.target.value;
    if (userText != '') {
        http.get(userText)
        .then(data => {
            displayUser.display(data)
            userProfile.style.display = 'flex';
            title.style.display = 'inline-block';
            userRepos.style.display = 'inline-block';
        })
        .catch(err => console.log(err));
    } else {
        userProfile.style.display = 'none';
        title.style.display = 'none';
        userRepos.style.display = 'none';
    }
})