class HTTPLibrary {
    constructor() {
        this.clien_id = 'f6c5d4d9888a47cd9b1c';
        this.client_secret = '0e4b40fd7568820d9f5fe1ed2c76167bd2e1baad';
    }
    async get (userName) {
        const profileResponse = await fetch(`https://api.github.com/users/${userName}?client_id=${this.clien_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();
        return {
            profile: profile,
            repos: profile.repos_url
        };
    }
}