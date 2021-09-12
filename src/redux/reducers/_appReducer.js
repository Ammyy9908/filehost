const intialState = {
    user:null,
    public_files:null,
    current_page:"drive",
    favourites:null,
    myfiles:null,
    mobile_nav:false,
    form_edit:false,
    trash:null
}


function AppReducer(state=intialState,action){
        switch(action.type){
            case "SET_USER":
                return{
                    ...state,
                    user:action.user
                }

                case "SET_TRASH":
                    return{
                        ...state,
                        trash:action.trash
                    }

                    case "ADD_TRASH":
                        const id = action.id;
                        const file = state.myfiles.filter((file)=>file._id===id)[0];

                        const index = state.myfiles.findIndex((file)=>file._id===id);
                        let newFiles = [...state.myfiles];

                        if (index >= 0) {
                            newFiles.splice(index, 1);
                    
                        }

                    

                        return{
                            ...state,
                            trash:[...state.trash,file],
                            myfiles:newFiles
                        }

                        case "RESTORE_TRASH":
                            const tid = action.id;
                            const trash = state.trash.filter((file)=>file._id===tid)[0];
    
                            const Trashindex = state.trash.findIndex((file)=>file._id===tid);
                            let newTrash = [...state.trash];
    
                            if (Trashindex >= 0) {
                                newTrash.splice(Trashindex, 1);
                        
                            }
    
                        
    
                            return{
                                ...state,
                                myfiles:[...state.myfiles,trash],
                                trash:newTrash
                            }

                case "SET_EDIT_FORM":{
                    return{
                        ...state,
                        form_edit:action.form_edit
                    }
                }

                case "SET_MOBILE_NAV":
                return{
                    ...state,
                    mobile_nav:action.mobile_nav
                }

                case "SET_MY_FILES":
                    return{
                        ...state,
                        myfiles:action.myfiles
                    }

                case "SET_FAVOURITES":
                    return{
                        ...state,
                        favourites:action.favourites
                    }

                case "SET_CURRENT_PAGE":
                return{
                    ...state,
                    current_page:action.current_page
                }

            case "ADD_FILE":{
                return{
                    ...state,
                    myfiles:[...state.myfiles,action.file]
                }
            }

                case "SET_PUBLIC":
                return{
                    ...state,
                    public_files:action.public_files
                }

            default:{
                return state
            }
        }
}

export default AppReducer;