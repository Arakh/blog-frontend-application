import React from 'react' ;
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from '../route/AuthenticatedRoute'
import RegisterUser from '../component/UserRegister'
import Login from '../component/Login'
import UserList from "../component/UserList";
import Index from '../component/Index'
import Logout from '../component/Logout'
import RegisterSuccess from '../component/RegisterSuccess'
import RegisterFailed from '../component/RegisterFailed'
import ResetPassword from "../component/ResetPassword";
import CheckEmail from '../component/CheckEmail'
import CreateBlog from "../component/blog/CreateBlog";
import Blog from "../component/blog/Blog";
import CreateCategory from "../component/category/CreateCategory";
import CategoryList from "../component/category/CategoryList";
import NewPosting from "../component/blog/NewPosting";
import BlogApproval from "../component/blog/BlogApproval";
import Reporting from "../component/reporting/Reporting";
import MyPostingPage from "../component/blog/MyPostingPage";

function AppRouter() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component = {Index} />
                    <Route path="/home" exact component = {Index} />
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
                    <AuthenticatedRoute path="/blog/mypost" exact component = {MyPostingPage} />
                </Switch>
            </Router>
        </div>

    );
}

export default AppRouter;
