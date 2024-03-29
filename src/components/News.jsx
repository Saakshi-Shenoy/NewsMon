import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${props.category} - NewsMon`;
    updateNews();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center pt-3"
        style={{ margin: "40px 0px", marginTop: "90px", textDecoration: "underline", color: "rgb(2, 9, 45)", fontWeight:"bold" }}
      >
       Top{" "}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
        Headlines
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4">
                  <NewsItem
                    key={element.url}
                    title={element.title?element.title.slice(0, 45):""}
                    description={element.description?element.description.slice(0,88):""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
