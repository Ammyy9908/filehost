const intialState = {
    user:null,
    public_files:null,
    current_page:"drive",
    favourites:null,
    myfiles:null,
    mobile_nav:false
}


function AppReducer(state=intialState,action){
        switch(action.type){
            case "SET_USER":
                return{
                    ...state,
                    user:action.user
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
                    public_files:[...state.public_files,action.file]
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