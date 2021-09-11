import React from 'react'
import { connect } from 'react-redux'
import { setMobileNav } from '../redux/actions/_appAction'
import "./Overlay.css"
function Overlay(props) {
    return (
        <div className={`overlay ${props.mobile_nav && "overflow_enable"}`}onClick={()=>props.setMobileNav(false)}>
            
        </div>
    )
}

const mapStateToProps = (state)=>({
    mobile_nav:state.appReducer.mobile_nav
})
const mapDispatchToProps = (dispatch)=>({
    setMobileNav:(mobile_nav)=>dispatch(setMobileNav(mobile_nav))
})
export default connect(mapStateToProps,mapDispatchToProps)(Overlay)
