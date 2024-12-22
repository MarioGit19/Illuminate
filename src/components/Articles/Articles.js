import { useState, useEffect } from "react";
import { articles } from "../../data/data";
import "../../styles/components/articles.css";

const Articles = () => {
  const [expandedArticles, setExpandedArticles] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const articleElements = document.querySelectorAll(".article-container");

      articleElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;

        if (isVisible) {
          element.classList.add("fade-in");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDescription = (articleId) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  const truncateText = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  return (
    <section className="articles-section">
      {articles.map((article) => (
        <div key={article.article_id} className="article-container">
          <div className="article-image">
            <img src={article.article_image} alt={article.article_title} />
          </div>
          <div className="article-content">
            <h2 className="article-title">
              {article.article_title}{" "}
              <span className="emphasis">{article.article_emphasis}</span>
            </h2>
            <p className="article-description">
              {expandedArticles[article.article_id]
                ? article.description
                : truncateText(article.description, 60)}
            </p>
            <button
              className="see-more-btn"
              onClick={() => toggleDescription(article.article_id)}
            >
              {expandedArticles[article.article_id] ? "See Less" : "See More"}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Articles;
