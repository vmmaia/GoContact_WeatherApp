import './footer.css';

const Footer = (props) => {
  return (
    <div className="page-footer">
      <div>{'Desafio técnico - GoContact - Vasco Maia - Maio 2021'}</div>
      <div className="flex-break" />
      <div>
        <i className="fa fa-github" aria-hidden="true"></i>{' '}
        <a href="https://github.com/vmmaia">Github</a>{' '}
        <i className="fa fa-linkedin-square" aria-hidden="true"></i>{' '}
        <a href="https://www.linkedin.com/in/vasco-maia-451616170/">Linkedin</a>
      </div>
    </div>
  );
};

export default Footer;
