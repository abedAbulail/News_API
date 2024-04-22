import React, { useState, useEffect } from "react";
import axios from "axios";
import "./news.css"
const News = () => {
  const [articles, setArticles] = useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=20624674f79e4509bc05ff758ba980b3"
        );
        console.log(response)
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();

  }, []);
  let i=1;

  if (loading) {
   return(
    <h1>loading...</h1>
   );
  }

  return (
    <div className="container">
      <h1>Top Headlines</h1>
      <div className="row justify-content-center">
        <hr></hr>
        {articles && articles.map((article) => (
          <div key={article.url} className=" col-5 news m-5">
            <h2>{i++}_ {article.title}</h2>
            <img src={article.urlToImage} alt="no_image"height={100}></img>
            <p>{article.description}</p>
            <p>{article.author}</p>
            <a
              className="m-2"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
