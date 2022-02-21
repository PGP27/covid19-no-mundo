import { FaGithub } from 'react-icons/fa';

const About = () => (
  <div className="flex-1 flex flex-col items-center">
    <article className="p-8">
      <div className="md:p-8">
        <h2 className="text-lg">Sobre este site:</h2>
        <p className="mt-4 text-justify">
          Esse é um site com estatísticas da Covid-19 em todo o mundo.
          Aqui você encontra, em números e gráficos, os impactos nacionais, continentais e globais
          causados por esse vírus desde o início da pandemia até os dias de hoje.
          Todos os dados presentes nesse site foram consumidos da API <a className="text-blue-800 hover:underline underline-offset-2" rel="noreferrer" href="https://corona.lmao.ninja/" target="_blank">disease.sh</a>.
          Website desenvolvido por Pedro Gonçalves Pereira, desenvolvedor de software e bacharel em ciência da computação.
        </p>
        <div>
          <a className="mt-10 w-[133px] flex items-center text-xl text-gray-700 hover:opacity-70" rel="noreferrer" href="https://github.com/PGP27/covid19-no-mundo/" target="_blank">
            Repositório <FaGithub className="ml-2" fontSize={20} />
          </a>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:p-8">
        <h3 className="text-lg">Bibliotecas e Frameworks utilizados:</h3>
        <ul className="mt-4 leading-8">
          <li><a className="text-blue-800 hover:underline underline-offset-2" rel="noreferrer" href="https://reactjs.org/" target="_blank">React</a></li>
          <li><a className="text-blue-800 hover:underline underline-offset-2" rel="noreferrer" href="https://reactrouter.com/" target="_blank">React Router</a></li>
          <li><a className="text-blue-800 hover:underline underline-offset-2" rel="noreferrer" href="https://github.com/yanivam/react-svg-worldmap/" target="_blank">React SVG world map</a></li>
          <li><a className="text-blue-800 hover:underline underline-offset-2" rel="noreferrer" href="https://github.com/reactchartjs/react-chartjs-2/" target="_blank">React Chartjs 2</a></li>
          <li><a className="text-blue-800 hover:underline underline-offset-2" rel="noreferrer" href="https://unform.dev/" target="_blank">Unform</a></li>
          <li><a className="text-blue-800 hover:underline underline-offset-2" rel="noreferrer" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a></li>
        </ul>
      </div>
    </article>
  </div>
);

export default About;
