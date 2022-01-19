const userInput = document.getElementById('user-name');
const userProfile = document.getElementById('user-profile');
const title = document.getElementById('latest-repos-title');
const userRepos = document.getElementById('user-repos');

userProfile.style.display = 'none';
title.style.display = 'none';
userRepos.style.display = 'none';

const http = new HTTPLibrary();

const ui = new UI();

userInput.addEventListener('keyup', (e) => {
    const userText = e.target.value;
    if (userText != '') {
        http.get(userText)
        .then(handleErrors)
        .then(data => {
            if(data.profile.message === 'Not Found') {
                ui.notFoundError('User not found...');
                ui.clear();
            } else {
                ui.displayUser(data.profile);
                ui.displayRepos(data.repos);
            }
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        ui.clear();
    }
})

function handleErrors(res) {
    if (res.mesage === 'Not Found') {
        throw new Error(res.message);
    }
    return res;
}