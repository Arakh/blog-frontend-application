import React from 'react' ;
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AuthenticatedRoute from '../route/AuthenticatedRoute'
import Home from '../containers/Home/Home';
import MyPost from "../containers/Post/MyPost";
import CreatePost from "../containers/Post/CreatePost";
import CategoryList from "../containers/Category/CategoryList";
import CreateCategory from "../containers/Category/CreateCategory";
import BlogApproval from "../containers/BlogApproval/BlogApproval";
import UserList from "../containers/User/UserList";
import Reporting from "../containers/Reporting/Reporting";
import Post from "../containers/Post/Post";
import RegisterUser from '../containers/Authentication/UserRegister';
import Login from '../containers/Authentication/Login';
import Logout from '../containers/Authentication/Logout';
import RegisterSuccess from '../containers/Authentication/RegisterSuccess';
import RegisterFailed from '../containers/Authentication/RegisterFailed';
import ResetPassword from "../containers/Authentication/ResetPassword";
import CheckEmail from '../containers/Authentication/CheckEmail';

function AppRouter() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component = {Home} />
                    <Route path="/home" exact component = {Home} />
                    <AuthenticatedRoute path="/category/create" exact component = {CreateCategory} />
                    <AuthenticatedRoute path="/category/list" exact component = {CategoryList} />
                    <AuthenticatedRoute path="/blog/approval" exact component = {BlogApproval} />
                    <AuthenticatedRoute path="/admin/reporting" exact component = {Reporting} />
                    <Route path="/register-successfully" exact component = {RegisterSuccess}/>
                    <Route path="/register-failed" exact component = {RegisterFailed}/>
                    <Route path="/login" exact component = {Login} />
                    <Route path="/logout" exact component = {Logout} />
                    <Route path="/reset" exact component = {ResetPassword} />
                    <Route path="/checkemail" exact component = {CheckEmail} />
                    <Route path="/user/register" exact component = {RegisterUser} />
                    <Route path="/blog" exact component = {Post} />
                    <AuthenticatedRoute path="/user/list" exact component={UserList} />
                    <AuthenticatedRoute path="/blog/create" exact component={CreatePost} />
                    <AuthenticatedRoute path="/blog/mypost" exact component = {MyPost} />
                </Switch>
            </Router>
        </div>

    );
}

export default AppRouter;
