import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../../services/service";
import "./style.css";
import QuoteBox from "../QuoteBox";

export default function Quotes() {
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const getRandomQuote = useCallback(async () => {
    try {
      setIsWaiting(true);
      const res = await service.getQoutes(name);
      setQuote(res);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
      setIsWaiting(false);
    }
  }, [name]);

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  if (isLoading) return <p className="center">loading...</p>;
  else
    return (
      <div className="quote-container">
        <Link to="/" className="btn back-btn">
          Back to home
        </Link>
        <section className="quote-center">
          {quote?.length === 0 ? (
            <div className="message">
              <h1>This character does not have any quotes!</h1>
            </div>
          ) : (
            <section className="box">
              {quote?.map((q) => (
                <QuoteBox
                  key={q.quote_id}
                  isWaiting={isWaiting}
                  quote={q.quote}
                  randomQuoteHandler={getRandomQuote}
                />
              ))}
            </section>
          )}
        </section>
      </div>
    );
}
