import React from 'react';
import styles from './mainlayout.less';

class MainLayout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let { children } = this.props;
        return <div>
            <nav className={ styles.navbarFixTop }>
                <div className={ styles.widthLimit }>

                </div>
            </nav>
            { children }
        </div>
    }
}
export default MainLayout