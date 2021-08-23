const intialState = {
    user:null,
    public_files:null
}


function AppReducer(state=intialState,action){
        switch(action.type){
            case "SET_USER":
                return{
                    ...state,
                    user:action.user
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