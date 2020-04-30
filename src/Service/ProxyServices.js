import axios from 'axios'

const API_URL = 'http://localhost:8090';
const API_URL2 = 'http://localhost:8081';
const API_URL_APPROVAL = 'http://localhost:8087';
const API_URL_REPORT = 'http://localhost:8089';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const PASSWORD_SESSION_ATTRIBUTE_NAME = 'password'
export const TOKEN = ''

class ProxyServices {

	executeBasicAuthenticationService(username, password) {

		let payload = {
			username: username,
			password: password
		};

		let basicAuth = btoa(username + ':' + password);
		axios.defaults.headers.common = {'Authorization': `Basic ${basicAuth}`};

		return axios.post(`${API_URL}/api/authentication`, payload)
	}

	createBasicAuthToken(username, password) {
		return 'Basic ' + window.btoa(username + ":" + password)
	}

	registerSuccessfulLogin(username, password, token) {
		localStorage.setItem(TOKEN, token)
		localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
		localStorage.setItem(PASSWORD_SESSION_ATTRIBUTE_NAME, password)

		this.getUserData(username)
			.then(response => response.data)
			.then((json) => {
				localStorage.setItem("id", json.data.data.id);
				localStorage.setItem("firstname", json.data.data.firstname);
				localStorage.setItem("lastname", json.data.data.lastname);
			}).catch(() => {
		});
	}

	logout() {
		localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
		localStorage.removeItem(TOKEN);
	}

	isUserLoggedIn() {
		let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
		if (user === null) return false
		return true
	}

	getToken() {
		return localStorage.getItem(TOKEN)
	}

	getUserList() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL}/api/all-users`);

	}

	resetPasswordRequest(email) {
		let payload = {
			email: email
		}
		return axios.post(`${API_URL}/api/resetpassword`, payload);
	}

	getBlogList(category, page) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		if (category === '' || category === null || category === 'All') {
			return axios.get(`${API_URL2}/api/posts?page=${page}&size=6`);
		} else {
			return axios.get(`${API_URL2}/api/posts/category?category=`+ category+'&page='+page+'&size=6');
		}
	}

	getCategoryList() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL2}/api/categories`);
	}

	submitBlog(payload) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.post(`${API_URL2}/api/posts`, payload);
	}

	createCategory(payload) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.post(`${API_URL2}/api/categories`, payload);
	}

	getBlogByTitle(title) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};


		if (title) {
			return axios.get(`${API_URL2}/api/post?title=${title}` );
		}
	}

	submitComment(payload) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.post(`${API_URL2}/api/comments`, payload);
	}

	getCommentByTitle(title) {
	   axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};


		if (title) {
			return axios.get(`${API_URL2}/api/comments-by-title?title=${title}` );
		}
	}

	getTodayPosting(pageNumber) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL2}/api/posts/today?page=`+(pageNumber-1)+`&size=6`);

	}

	getBlogByKeyWord(keyword, pagenumber) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		if (pagenumber) {
			return axios.get(`${API_URL2}/api/posts/search?keyword=${keyword}&page=${pagenumber}&size=6` );
		} else {
			return axios.get(`${API_URL2}/api/posts/search?keyword=${keyword}&page=0&size=6` );
		}
	}

	getAllApprovalData(approvalProgress, page) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		if (approvalProgress) {
			return axios.get(`${API_URL_APPROVAL}/api/approval-list?approval=${approvalProgress}&page=`+page+`&size=6` );
		}
	}

	updateProgressStatus(id, status, progress) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};


		if (id) {
			return axios.post(`${API_URL_APPROVAL}/api/process?id=${id}&status=${status}&progress=${progress}` );
		}
	}

	sendNotification(message) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		if (message) {
			return axios.get(`${API_URL_APPROVAL}/send/message?message=${message}`);
		}
	}

	getStatistic() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL_REPORT}/api/statistic` );
	}

	getBlogNumberPerCategory() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL2}/api/posts/report` );
	}

	getBlogNumberPerCategoryV2() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL2}/api/posts/report-v2` );
	}

	getBlogNumber() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL2}/api/posts/blog-rownum` );
	}

	getApprovalStatistic() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL_APPROVAL}/api/approval-statistic` );
	}

	getApprovalResultStatistic() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL_APPROVAL}/api/approval-result-statistic` );
	}

	getApprovalResultStatisticV2() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL_APPROVAL}/api/approval-result-statistic-v2` );
	}

	getApprovalStatisticV2() {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL_APPROVAL}/api/approval-statistic-v2` );
	}

	getPostingByUsername(pageNumber, username, category) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		if (category && category !== "All") {
			return axios.get(`${API_URL2}/api/post-by-username-and-category?username=`+username+`&category=`+category+`&page=`+(pageNumber)+`&size=6`);
		}

		return axios.get(`${API_URL2}/api/post-by-username?username=`+username+`&page=`+(pageNumber)+`&size=6`);
	}

	getPostingByUsernameAndKeyword(pageNumber, username, keyword) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		if (keyword) {
			return axios.get(`${API_URL2}/api/post-by-username-and-keyword?username=`+username+`&keyword=`+keyword+`&page=`+(pageNumber)+`&size=6`);
		}

		return axios.get(`${API_URL2}/api/post-by-username?username=`+username+`&page=`+(pageNumber)+`&size=6`);
	}

	getUserData(username) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.get(`${API_URL}/api/find-user-by-username/`+username);
	}

	deleteUser(username) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};

		return axios.delete(`${API_URL}/api/delete/user/`+username);
	}

}

export default new ProxyServices()
