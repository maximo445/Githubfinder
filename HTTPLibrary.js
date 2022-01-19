class HTTPLibrary {
    constructor() {
        this.client_id = 'f6c5d4d9888a47cd9b1c';
        this.client_secret = '0e4b40fd7568820d9f5fe1ed2c76167bd2e1baad';
        this.repos_count = 5;
        this.repos_sort = 'created: asc'
    }
    async get (userName) {
        
        const profileResponse = await fetch(`https://api.github.com/users/${userName}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const reposReponse = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);     
        
        const profile = await profileResponse.json();
        const repos = await reposReponse.json();

        return {
            profile: profile,
            repos: repos
        };
    }
}