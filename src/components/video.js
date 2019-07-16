import React from 'react';

const Video = (props) => {
    
    return (
            <div className="col-sm-6">
                <iframe src={props.url}
                    className=""
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title={props.title}
                />
                <h4 className="video-title">{props.title}</h4>
                
                <p className="video-title">{props.description}</p>
        </div>
    );
}

export default Video;