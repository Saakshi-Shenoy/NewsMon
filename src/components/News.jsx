import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props)=> {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
     
    // constructor(props){
    //     super(props);
    // //     
    //  }

    const updateNews= async ()=> {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      props.setProgress(70);

      setArticles(parsedData.articles);
      setTotalArticles(parsedData.totalResults);

       props.setProgress(100); 

    }

    useEffect(() => {
      document.title = `${props.category} - NewsMon`;
      updateNews();  
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a652694cc29647e7baa68173b2cfa40d&page=1&pageSize=${props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles, totalArticles:parsedData.totalResults});
      


  // const handlePrevClick = async ()=>{

  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a652694cc29647e7baa68173b2cfa40d&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);

  //   setPage(page-1);
  //   updateNews();

  // }

  // const handleNextClick = async ()=>{

  //   // if(this.state.page+1 > Math.ceil(this.state.totalArticles/props.pageSize)){

  //   // }
  //   // else{
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a652694cc29647e7baa68173b2cfa40d&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
    
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);

      
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
    
      setArticles(articles.concat(parsedData.articles));
      setTotalArticles(parsedData.totalResults);

    }


    return (
      <>
        <h1 className="text-center" style={{margin: "40px 0px", marginTop:'90px'}}>NewsMon - Top {props.category} Headlines</h1>
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return ( <div className="col-md-4">
            <NewsItem key={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>);
        })}   
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>  &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button> */}

        </> 
     
    )
} 

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News