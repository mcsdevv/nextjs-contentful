function Post({ alt, date, image, title }) {
  return (
    <div className="container">
      <img alt={alt} src={image} />
      <div className="text">
        <h2>{title}</h2>
        <h4>{date}</h4>
      </div>
      <style jsx>{`
        .container {
          height: 453px;
          margin-bottom: 72px;
        }
        .text {
          margin-top: -140px;
          padding-left: 2em;
          position: absolute;
        }
        h2 {
          color: white;
          font-size: 24px;
          margin-bottom: 0;
        }
        h4 {
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
          margin-top: 0.4em;
        }
      `}</style>
    </div>
  );
}

export default Post;
