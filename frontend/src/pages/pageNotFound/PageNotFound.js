import './pageNotFound.css';

const PageNotFound = (props) => {
  return (
    <div className="error-page-container">
      <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
      <p>The page you are looking for does not exist</p>
    </div>
  );
};

export default PageNotFound;
