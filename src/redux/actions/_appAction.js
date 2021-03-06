
export const setUser =(user)=>({
    
    type:"SET_USER",
    user

})

export const setPublicFiles =(public_files)=>({
    
        type:"SET_PUBLIC",
        public_files
    
})

export const addFile = (file)=>({
    type:"ADD_FILE",
    file
})

export const setCurrentPage = (current_page)=>({
    type:"SET_CURRENT_PAGE",
    current_page
})

export const setFavourites = (favourites)=>({
    type:"SET_FAVOURITES",
    favourites
})

export const setMyFiles = (myfiles)=>({
    type:"SET_MY_FILES",
    myfiles
})

export const setMobileNav = (mobile_nav)=>({
    type:"SET_MOBILE_NAV",
    mobile_nav
})

export const setEditForm = (form_edit)=>({
    type:"SET_EDIT_FORM",
    form_edit
})

export const setTrash = (trash)=>({
    type:"SET_TRASH",
    trash
})

export const addTrash = (id)=>({
    type:"ADD_TRASH",
    id
})

export const restoreTrash = (id)=>({
    type:"RESTORE_TRASH",
    id
})