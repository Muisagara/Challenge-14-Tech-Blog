import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      < div className="container text-center mb-5">
        <h4>
          "Success is the sum of small efforts, repeated day-in and day-out." - Robert Collier
        </h4>
      </div>
    </footer>
  );
};

export default Footer;