import './spinner.css';

const Spinner = (props) => {
  return (
    <div className="spinner-wrapper">
      <i className="fa fa-spinner" aria-hidden="true"></i>
      <span>Searching</span>
    </div>
  );
};

export default Spinner;
