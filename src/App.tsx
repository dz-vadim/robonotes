import React, {ReactNode, useCallback, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBrain,faLightbulb, faThumbtack, faPen, faArchive, faTrash} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import NoteToolBar from "./components/UI/NoteToolBar/NoteToolBar";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {userSlice} from "./store/reducers/UserSlice";
import {fetchUsers} from "./store/reducers/ActionCreators";
import PostContainer from "./components/PostContainer";
import {postAPI} from "./servises/PostServise";
// library.add( faCheckSquare, faCoffee)

const App = () => {
    return (
        <div>

            <PostContainer/>
        </div>
    );
};

export default App;