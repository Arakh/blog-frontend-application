import React from 'react' ;
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from '../route/AuthenticatedRoute'
import RegisterUser from '../components/UserRegister'
import Login from '../components/Login'
import UserList from "../components/UserList";
import Index from '../components/Index'
import Logout from '../components/Logout'
import RegisterSuccess from '../components/RegisterSuccess'
import RegisterFailed from '../components/RegisterFailed'
import ResetPassword from "../components/ResetPassword";
import CheckEmail from '../components/CheckEmail'
import CreateBlog from "../components/blog/CreateBlog";
import Blog from "../components/blog/Blog";
import CreateCategory from "../components/category/CreateCategory";
import CategoryList from "../components/category/CategoryList";
import NewPosting from "../components/blog/NewPosting";
import BlogApproval from "../components/blog/BlogApproval";
import Reporting from "../components/reporting/Reporting";
import MyPost from "../containers/Post/MyPost";
import HeaderMenu from "../components/HeaderMenu";

import Home from '../containers/Home/Home'

function AppRouter() {
    return (
        <div>
            <HeaderMenu />
            <Router>
                <Switch>
                    <Route path="/" exact component = {Home} />
                    <Route path="/home" exact component = {Home} />
                    <AuthenticatedRoute path="/blog/new" exact component = {NewPosting} />
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
                    <Route path="/blog" exact component = {Blog} />
                    <AuthenticatedRoute path="/user/list" exact component={UserList} />
                    <AuthenticatedRoute path="/blog/create" exact component={CreateBlog} />
                    <AuthenticatedRoute path="/blog/mypost" exact component = {MyPost} />
                </Switch>
            </Router>
        </div>

    );
}

export default AppRouter;
