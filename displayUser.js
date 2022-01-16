class DisplayUser {

    constructor () {
        this.client_id = 'f6c5d4d9888a47cd9b1c';
        this.client_secret = '0e4b40fd7568820d9f5fe1ed2c76167bd2e1baad';
    }

    async display (data) {
        const userProfile = document.querySelector('#user-profile');
        const userRepos = document.querySelector('#user-repos')
        const http = new HTTPLibrary();
        let imgSrc = '';
        if (data.profile.avatar_url == undefined) {
            imgSrc = 'user-icon.png';
        } else {
            imgSrc = data.profile.avatar_url;
        }
        const output = 
        `<div id="img-section">
            <img src="${imgSrc}" alt="Profile Picture">
            <a href="${data.profile.html_url}" target="_blank">View Profile</a>
        </div>
        <div id="info-section">
            <div id="top">
                <p class="item-show">Public Repos: ${data.profile.public_repos}</p>
                <p class="item-show">Public Gists: ${data.profile.public_gists}</p>
                <p class="item-show">Public Followers: ${data.profile.followers}</p>
                <p class="item-show">Public Following: ${data.profile.following}</p>
            </div>
            <ul id="info-ul">
                <li class="info-box">Company: ${data.profile.company}</li>
                <li class="info-box">Website/Blog: ${data.profile.blog}</li>
                <li class="info-box">Location: ${data.profile.location}</li>
                <li class="info-box">Member Since: ${data.profile.created_at}</li>
            </ul>
        </div>`

        userProfile.innerHTML = output;

        const resposResponse = await fetch(data.profile.repos_url + `?client_id=${this.clien_id}&client_secret=${this.client_secret}`);
        const repositories = await resposResponse.json();

        let reposOutput = '';
        for(let i = 0; i < repositories.length; i++) {
            if (i > 4) {
                break;
            }
            reposOutput += `
            <div class="repo">
                <div id="top">
                    <a href="${repositories[i].html_url}" target="_blank">${repositories[i].full_name.split('/')[1]}</a>
                </div>
                <div id="bottom">
                    <p>Stars: ${repositories[i].stargazers_count}</p>
                    <p>Watchers: ${repositories[i].watchers}</p>
                    <p>Forks: ${repositories[i].forks}</p>
                </div>
            </div>`
        }
        userRepos.innerHTML = reposOutput;
    }
}
