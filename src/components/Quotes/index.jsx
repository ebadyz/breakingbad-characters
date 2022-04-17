import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/service";
import "./style.css";
import QuoteBox from "../QuoteBox";

export default function Quotes() {
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const getRandomQuote = async () => {
    try {
      setIsWaiting(true);
      const res = await service.get(`quote/random?autho%20r=${name}`);
      setQuote(res);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  if (isLoading) return <p className="center">loading...</p>;
  else
    return (
      <section className="center">
        {quote.length === 0 ? (
          <div className="message">
            <h1>This character does not have any quotes!</h1>
          </div>
        ) : (
          <section className="box">
            {quote.map((q) => (
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
    );
}
