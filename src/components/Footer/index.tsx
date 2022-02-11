import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center p-2 text-center bg-gray-100 md:flex-row">
      <p>Website created by Pedro Gonçalves Pereira. All Rights Reserved</p>
      <div className="flex flex-row items-center justify-center">
        <a href="https://www.linkedin.com/in/pedrogon%C3%A7alvespereira/" target="_blank">
          <FaLinkedin fontSize={22} className="mx-2 hover:opacity-60" />
        </a>
        <a href="https://github.com/PGP27" target="_blank">
          <FaGithub fontSize={22} className="hover:opacity-60" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
