import React from 'react';
import Butter from 'buttercms';
import { Helmet } from "react-helmet";
import MainLayout from '../layout/mainlayout.jsx';
import { Link } from 'react-router';
import styles from './post.less';

const butter = Butter("96a3af80d38da4a1925f455895d63270e480d191");

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            previous_post : null ,
            next_post : null
        }
    }

    componentWillMount() {
        let { slug } = this.props.params;
        butter.post.retrieve(slug).then((resp) => {
            this.setState({
                loaded: true,
                post: resp.data.data ,
                previous_post : resp.data.meta.previous_post ,
                next_post : resp.data.meta.next_post
            })
        });
    }



    render() {
        let { slug } = this.props.params;
        let { previous_post ,next_post } = this.state;
        if (this.state.loaded) {
            const post = this.state.post;

            return (
                <MainLayout clickSearch={ this.clickSearch.bind(this) }>
                    <Helmet>
                        <title>{post.seo_title}</title>
                        <meta name="description" content={post.meta_description}/>
                        <meta name="og:image" content={post.featured_image}/>
                    </Helmet>
                    <div className={ styles.note }>
                        <div className={ styles.post }>
                            <div className={ styles.title }>{ post.title }</div>
                            <div className={ styles.showContent } dangerouslySetInnerHTML={{__html: post.body}}/>
                            <div className={ styles.pagination }>
                                <span onClick={ ()=>{ window.open("/#/home") } }>首页</span>
                                上一篇 :{ previous_post ? <span><Link to={`/post/${ previous_post.slug }`}>{ previous_post.title }</Link></span> : null }
                                下一篇 :{ next_post ? <span><Link  to={`/post/${ next_post.slug }`}>{ next_post.title }</Link></span> : null }
                            </div>
                            <iframe
                                id="uyan_iframe"
                                src={ `./comment.html?slug=${ slug }` }
                                frameBorder="0"
                                style={{ width : '100%' ,minHeight : '250px'}}
                            ></iframe>
                        </div>
                    </div>
                </MainLayout>
            );
        } else {
            return <MainLayout></MainLayout>
        }
    }
    clickSearch(searchWord){
        window.open("/#/home/"+searchWord);
    }
}

export default Post ;