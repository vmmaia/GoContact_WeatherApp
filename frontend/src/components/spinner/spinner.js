import './spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-wrapper" data-testid="spinner-wrapper">
      <i className="fa fa-spinner" aria-hidden="true"></i>
      <span>Searching</span>
    </div>
  );
};

export default Spinner;
