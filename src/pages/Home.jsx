import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import Illsutration from '../components/Illsutration'
import "./Home.css"
function Home(props) {

    const history = useHistory();
    const moveToDashboard = (path)=>{
        history.push(path);
    }
    return (
        <div className="home">
            <div className="container">
            <header>
                <Link to="#">Filehost.</Link>
                <div className="nav_list">
                    <Link to="/learn">Learn</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>
                </div>
                <div className="product__auth__links">
                    <Link to="/auth/login">Log in</Link>
                    <Link to="/auth/register">Sign up</Link>
                </div>
            </header>




            <section className="hero">
                <div className="section__container">
                    <div className="section_content">
                    <h1>This Page is Under Development</h1>
                    <button onClick={()=>moveToDashboard(props.user?'/dashboard/drive':'/auth/login')}>{props.user?"View Dashboard":"Login to View Dashboard"}</button>
                    </div>
                </div>
            </section>
            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user
})
export default connect(mapStateToProps,null)(Home)
