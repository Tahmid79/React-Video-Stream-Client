import React from 'react' ;
//https://developers.google.com/identity/sign-in/web/reference

import {connect} from "react-redux";
import {signIn , signOut } from "../actions";

class GoogleAuth extends React.Component{

    componentDidMount() {
        window.gapi.load('client:auth2' , ()=>{
            window.gapi.client.init({
                clientId:'648317392979-i0me1406nfkfu1ftoqf5jd89sjvpdc50.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance() ;

                this.onAuthChange(this.auth.isSignedIn.get()) ;

                this.auth.isSignedIn.listen( this.onAuthChange ) ;

            }) ;
        });
    }

    onAuthChange = ( isSignedIn ) =>{

        if ( isSignedIn ){
           this.props.signIn(this.auth.currentUser.get().getId()) ;
       }

       else  {
           this.props.signOut() ;
       }
    };

    onSignInClick =()=>{
        this.auth.signIn() ;
    };

    onSignOutClick = () =>{
        this.auth.signOut() ;
    } ;


    renderAuthButton(){

        if (this.props.isSignedIn === null){
            return null ;
        }

        else if ( this.props.isSignedIn === true )
            return (<div>

                <button onClick={this.onSignOutClick} className="ui red google button" >
                    <i className="google icon"  />
                    Sign Out
                </button>
            </div> );

        else if ( this.props.isSignedIn === false)
            return (<div>
                <button  onClick={this.onSignInClick} className="ui red google button" >
                    <i className="google icon"/>
                    Sign In
                </button>
            </div>) ;
    }

    render() {
    return <div>{this.renderAuthButton()}</div>
}
}

const mapStateToProps = (state)=>{
        return { isSignedIn : state.auth.isSignedIn }  ;
};

export default connect(mapStateToProps , {signIn , signOut})(GoogleAuth) ;
