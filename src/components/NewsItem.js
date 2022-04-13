import React from 'react'
export default function NewsItem (props) {
    
        let {title,description,imgUrl,newsUrl,author,date} = props                        
        return (
            <div className='conatiner'>
                <div className="card" >
                    <img src={imgUrl} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark ">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}
