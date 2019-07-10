import {combineReducers} from "redux";
import blogPostList from "./reducers/blogPostList";
import blogPost from "./reducers/blogPost";
import commentList from "./reducers/commentList";
import auth from "./reducers/auth";
import registration from "./reducers/registration";
import{reducer as formReducer} from "redux-form";
import {routerReducer} from "react-router-redux";

export default combineReducers({
   blogPostList,
   blogPost,
   commentList,
   auth,
   registration,
   form: formReducer,
   router: routerReducer


});