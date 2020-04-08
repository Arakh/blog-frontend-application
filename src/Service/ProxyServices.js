import axios from 'axios'
import {Redirect} from "react-router-dom";
import React from "react";

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

        console.log("Payload:", payload);

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
    }


    logout() {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(TOKEN);
        /*return <Redirect to="/login" />*/
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        //let password = localStorage.getItem(PASSWORD_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getToken(){
        return localStorage.getItem(TOKEN)
    }

    getUserList(){
        /*let basicAuth = btoa(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) + ':' + localStorage.getItem(PASSWORD_SESSION_ATTRIBUTE_NAME));
        axios.defaults.headers.common = {'Authorization': `Basic ${basicAuth}`};*/
        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL}/api/all-users`);

    }

    resetPasswordRequest(email){
        let payload = {
            email: email
        }
        return axios.post(`${API_URL}/api/resetpassword`, payload);
    }

    getBlogList(category, page){

        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        //axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        if(category == '' || category == null){
           /* return axios.get(`${API_URL}/services/blog/api/posts`);*/
            return axios.get(`${API_URL2}/api/posts?page=${page}&size=6`);
        }else{
            return axios.get(`${API_URL2}/api/posts/category?category=`+ category+'&page='+page+'&size=6');
        }
    }

    getCategoryList(){
        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL2}/api/categories`);
    }

    submitBlog(payload){
        console.log("Payload:"+JSON.stringify( payload ));
        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.post(`${API_URL2}/api/posts`, payload);
    }

    createCategory(payload){
        console.log("Payload:"+JSON.stringify( payload ));
        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.post(`${API_URL2}/api/categories`, payload);
    }

    getBlogByTitle(title){

        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        if(title){
            /* return axios.get(`${API_URL}/services/blog/api/posts`);*/
            return axios.get(`${API_URL2}/api/post?title=${title}` );
        }
    }

    submitComment(payload){
        console.log("Payload:"+JSON.stringify( payload ));
        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.post(`${API_URL2}/api/comments`, payload);
    }

    getCommentByTitle(title){

        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        if(title){
            /* return axios.get(`${API_URL}/services/blog/api/posts`);*/
            return axios.get(`${API_URL2}/api/comments-by-title?title=${title}` );
        }
    }

    getTodayPosting(pageNumber){

        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        /* return axios.get(`${API_URL}/services/blog/api/posts`);*/
        return axios.get(`${API_URL2}/api/posts/today`+"?page="+(pageNumber-1)+"&size=6");

    }

    getBlogByKeyWord(keyword, pagenumber){

        let token = this.getToken();
        console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        if(pagenumber){
            return axios.get(`${API_URL2}/api/posts/search?keyword=${keyword}&page=${pagenumber}&size=6` );
        }else{
            return axios.get(`${API_URL2}/api/posts/search?keyword=${keyword}&page=0&size=6` );
        }





    }

    getAllApprovalData(approvalProgress, page){

        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);


        if(approvalProgress){
            return axios.get(`${API_URL_APPROVAL}/api/approval-list?approval=${approvalProgress}`+'&page='+page+"&size=6" );
        }
    }

    updateProgressStatus(id, status, progress){

        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        if(id){
            return axios.post(`${API_URL_APPROVAL}/api/process?id=${id}&status=${status}&progress=${progress}` );
        }
    }

    sendNotification(message){
        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        if(message){
            return axios.get(`${API_URL_APPROVAL}/send/message?message=${message}`);
        }
    }

    getStatistic(){
        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL_REPORT}/api/statistic` );
    }

    getBlogNumberPerCategory(){
        let token = this.getToken();
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL2}/api/posts/report` );
    }

    getBlogNumberPerCategoryV2(){
        let token = this.getToken();
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL2}/api/posts/report-v2` );
    }

    getBlogNumber(){
        let token = this.getToken();
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL2}/api/posts/blog-rownum` );
    }

    getApprovalStatistic(){
        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL_APPROVAL}/api/approval-statistic` );
    }

    getApprovalResultStatistic(){
        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL_APPROVAL}/api/approval-result-statistic` );
    }

    getApprovalResultStatisticV2(){
        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL_APPROVAL}/api/approval-result-statistic-v2` );
    }

    getApprovalStatisticV2(){
        let token = this.getToken();
        //console.log("TOKEN SERVICE:", token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.getToken()}`};
        console.log("Header:", axios.defaults.headers.common);

        return axios.get(`${API_URL_APPROVAL}/api/approval-statistic-v2` );
    }

}

export default new ProxyServices()
