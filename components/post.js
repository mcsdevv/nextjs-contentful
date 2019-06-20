function Post({ alt, date, image, title, url }) {
  return (
    <div className="container">
      <a href={url}>
        <img alt={alt} src={image} />
      </a>
      <div className="text">
        <h2>{title}</h2>
        <h4>{date}</h4>
      </div>
      <style jsx>{`
        .container {
          cursor: pointer;
          margin-bottom: 48px;
          max-height: 453px;
        }
        a {
          border-bottom: none;
        }
        a:hover {
          border-bottom: none;
        }
        .text {
          margin-top: -160px;
          padding: 24px;
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
          font-weight: 500;
          margin-top: 8px;
        }
        @media screen and (max-width: 360px) {
          .text {
            margin-top: -8em;
          }
          h2 {
            font-size: 16px;
          }
          h4 {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default Post;
