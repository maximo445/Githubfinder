class UI {

    constructor () {
        this.client_id = 'f6c5d4d9888a47cd9b1c';
        this.client_secret = '0e4b40fd7568820d9f5fe1ed2c76167bd2e1baad';
        this.userProfile = document.querySelector('#user-profile');
        this.userRepos = document.querySelector('#user-repos');
        this.container = document.querySelector('#container');
    }

    async displayUser (data) {

        let imgSrc = '';
        if (data.avatar_url == undefined) {
            imgSrc = 'user-icon.png';
        } else {
            imgSrc = data.avatar_url;
        }
        const output = 
        `<div id="img-section">
            <img src="${imgSrc}" alt="Profile Picture">
            <a href="${data.html_url}" target="_blank">View Profile</a>
        </div>
        <div id="info-section">
            <div id="top">
                <p class="item-show">Public Repos: ${data.public_repos}</p>
                <p class="item-show">Public Gists: ${data.public_gists}</p>
                <p class="item-show">Public Followers: ${data.followers}</p>
                <p class="item-show">Public Following: ${data.following}</p>
            </div>
            <ul id="info-ul">
                <li class="info-box">Company: ${data.company}</li>
                <li class="info-box">Website/Blog: ${data.blog}</li>
                <li class="info-box">Location: ${data.location}</li>
                <li class="info-box">Member Since: ${data.created_at}</li>
            </ul>
        </div>`

        this.userProfile.innerHTML = output;
        this.userProfile.style.display = 'flex';
    }

    displayRepos(data) {

        let reposOutput = '';

        data.forEach(element => {

            reposOutput += `
            <div class="repo">
                <div id="top">
                    <a href="${element.html_url}" target="_blank">${element.full_name.split('/')[1]}</a>
                </div>
                <div id="bottom">
                    <p>Stars: ${element.stargazers_count}</p>
                    <p>Watchers: ${element.watchers}</p>
                    <p>Forks: ${element.forks}</p>
                </div>
            </div>`            
        });

        this.userRepos.innerHTML = reposOutput;
        this.userRepos.style.display = 'inline-block';
        document.querySelector('#latest-repos-title').style.display = 'inline-block';

    }

    clear() {
        this.userProfile.innerHTML = '';
        this.userRepos.innerHTML = '';
        this.userRepos.style.display = 'none';
        this.userProfile.style.display = 'none';
        document.querySelector('#latest-repos-title').style.display = 'none';
    }

    notFoundError(message) {
        if (document.querySelector('.alert')) {
            this.container.removeChild(document.querySelector('.alert'));
        }
        const alert = document.createElement('p');
        alert.className = 'alert';
        alert.appendChild(document.createTextNode(message));
        const search = document.getElementById('search');
        this.container.insertBefore(alert,search);
        setTimeout(() => {
            this.container.removeChild(alert);
        }, 3000);

    }
}
