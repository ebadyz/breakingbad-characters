import "./style.css";

export default function QuoteBox({ isWaiting, quote, randomQuoteHandler }) {
  return (
    <section className="box-content">
      <h1>Quote:</h1>
      {isWaiting ? (
        <p className="vertical-spacing">loading...</p>
      ) : (
        <h4 className="vertical-spacing">{quote}</h4>
      )}
      <button disabled={isWaiting} onClick={randomQuoteHandler} className="btn">
        Random quote
      </button>
    </section>
  );
}
