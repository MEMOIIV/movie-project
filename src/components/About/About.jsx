import React from "react";
import { Link } from "react-router-dom";
import AboutStyle from "./About.module.css";

export default function About() {
  return (
    <div className={AboutStyle.body}>
      <section className={AboutStyle.layer + " d-flex align-items-center "}>
        <div className={AboutStyle.textHeder + " ms-3"}>
          <h3>
            <span className={AboutStyle.welcome}>Welcome to NOXE :</span> <h4>Your go-to destination for
            discovering popular and trending movies and TV shows. This platform
            was created to give users a comprehensive, interactive experience,
            making it easy to explore, choose, and enjoy their favorite titles
            with detailed information and visuals.</h4>
          </h3>
        </div>
      </section>

      <section className="container my-5 py-5 ">
        <div className="row">
          <div className="col-md-12">
            <div className={AboutStyle.bg_card + " shadow-sm p-3 mb-5  rounded text-dark"}>
            <h3>Why I Built This Site : </h3>
            <p>
              I wanted to create this site as a part of my passion for web
              development and my love for cinema. The goal is to provide
              detailed and accurate information on movies and TV shows, helping
              fans make informed decisions and enjoy a rich viewing experience.
            </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className={AboutStyle.bg_card + " shadow-sm p-3 mb-5  rounded text-dark"}>
            <div>
            <h3>Key Features : </h3>
            <ul>
                <li><p><span><button className="btn btn-info p-1"> Advanced Search </button> : </span>Quickly find your favorite movies or shows and access all the details you need in one place.</p> </li>
                <li><p><span><button className="btn btn-info p-1">Responsive Design</button> : </span>The site is crafted to function seamlessly across all devices, from desktops to smartphones, ensuring a consistent, high-quality experience everywhere.</p></li>
                <li><p><span><button className="btn btn-info p-1">Real-time Content Updates</button> : </span>This platform uses the TMDb API for constantly updated movie and show data, ensuring users have the latest information at their fingertips.</p></li>
            </ul>
            </div>
            </div>
          </div>

          <div className="col-md-6 ">
          <div className={AboutStyle.bg_card + " shadow-sm p-3 mb-5  rounded text-dark"}>
          <h3>Technologies Used : </h3>
          <p>The site is built with some of the latest web technologies, including</p>
          <ul>
            <li><p><span><button className="btn btn-info p-1">React</button> : </span>for creating interactive user interfaces.</p></li>
            <li><p><span><button className="btn btn-info p-1">Axios </button> : </span>for interacting with the TMDb API and fetching data.</p></li>
            <li><p><span><button className="btn btn-info p-1">Joi </button> : </span>for secure input validation, ensuring a safe user experience.</p></li>
            <li><p><span><button className="btn btn-info p-1">CSS </button> : </span> and <span><button className="btn btn-info p-1 "> Responsive Design </button></span> to ensure seamless performance on any device .</p></li>
          </ul>
          </div>
          </div>

          <div className="col-md-12 ">
          <div className={AboutStyle.bg_card + " shadow-sm p-3 mb-5  rounded text-dark"}>
          <h3>Future Vision : </h3>
            <p>
                I aim to add new features, like the ability for users to save their favorite titles, 
                and to introduce interactive improvements for a more personalized and user-friendly experience
            </p>
          </div>
          </div>

          <div className="col-md-12">
            <div className={AboutStyle.bg_card + " shadow-sm p-3 mb-5  rounded text-dark"}>
                <h2>Finally : </h2>
                <p>I hope you find this site useful and enjoyable. I'm committed to continuously enhancing its features and functionality, 
                    making it the ultimate destination for movie and show enthusiasts.</p>
                    <p>You can visit my <Link to={'https://github.com'} className="text-decoration-none" target="_blank"> GitHub  </Link> profile to explore my latest projects, and feel free to connect with me on <Link to={'https://www.linkedin.com/in/amin-said-16262a210/'} className="text-decoration-none" target="_blank"> LinkedIn Profile </Link>.</p>
            </div>
          </div>
        </div>
          
      </section>
    </div>
  );
}
