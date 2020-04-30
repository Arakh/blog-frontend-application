import React from 'react';
import HeaderMenu from "../../components/HeaderMenu";

class CheckEmail extends React.Component {

    render() {

        return(
            <div>
                <HeaderMenu />
                <div className="card">
                    <div className="card-header">
                        <h2>Check Your email to get the Reset password Link!!!</h2>
                    </div>
                </div>
            </div>
        );
    }

}

export default CheckEmail;
