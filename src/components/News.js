import React ,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News (props) {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    let {category,country,pageSize,apikey} = props  
    

    const updateNews= async(props)=>{
        // props.setProgress(0);                            /// we are setting the progress bar like that when we load a data it will show like its moving from left to right  
        const url=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page+1}&pageSize=${pageSize}`                        
        setloading(true)
        let data = await fetch(url);
        // props.setProgress(40);
        let parsedData= await data.json()
        // props.setProgress(70)
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults)
        setloading(false);
        // props.setProgress(100);                     
    }
    useEffect(() => {
        updateNews(); 
        // eslint-disable-next-line                
    }, [])                          //// this is the input on  which change it will run in an empty field it will run one time

    const fetchMoreData= async(props)=>{
        const url=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page+1}&pageSize=${pageSize}`
        setpage(page+1);                                  /// it is an ansynchronous fn and it takes time to update whereas th url is being doing before that therefore write page+1 in the url
        // this.setState({loading:true});                         
        let data = await fetch(url);
        setloading({loading:false})
        let parsedData= await data.json()
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults)
        // loading:false
        

    }

    const capitalise =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
            <>     
                <h2 className='d-flex justify-content-center mt-3' style={{margin:"3%"}}>Top {capitalise(props.category)} Headlines</h2>
                <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles!==totalResults}                     
                        loader={<Spinner/>}>
                    <div className='container'>
                    <div className="row">
                    {/*if loading is true than dont show any content otherwise show content */}                    
                          {articles.map((element)=>{
                        return <div style={{padding:"1%" }} key={element.url} className='col-md-4'>
                        <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,60):"No description Available"} imgUrl={element.urlToImage?element.urlToImage:"No images to Dispay"} newsUrl={element.url} author={!element.author?"Unknown":element.author} date={element.publishedAt}/>
                        </div>
                        })}
                    
                    </div>
                    </div>
                </InfiniteScroll> 
            </>
        )
    
}

News.defaulProps={                                              
    pageSize:"10",
    category:"science"
}

News.propTypes={                                                 
    country:PropTypes.string,
    pageSize:PropTypes.number

}