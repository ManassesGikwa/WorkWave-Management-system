import './AboutPage.css'; 

function About() {
    return (
        <div className='about-container'>
            <div className='about-content'>
                <div className='about-text'>
                    <p>A few words</p>
                    <h1>About Our Employee Management System</h1>
                </div>
            </div>
            <div className='about-history'>
                <div className='about-history-content'>
                    <p className='about-teamname'>EMS Team</p>
                    <h1 className='head-about'>ABOUT  <br/> THE Project</h1>
                    <p className='about-quote'>
                        Our Employee Management System (EMS) is designed to streamline and simplify the management of employees within your organization.
                    </p>
                    <p>
                        With the EMS, you can efficiently handle various aspects of employee management, including tracking employee information, managing work schedules, monitoring attendance, and generating reports.
                    </p>
                    <p>
                        Our team is committed to delivering a user-friendly and robust solution that meets the needs of modern businesses, helping them optimize their workforce management processes.
                    </p>
                    <p>
                        Join us as we continue to enhance and evolve our EMS to empower businesses and support their growth and success.
                    </p>
                </div>
            </div> 
            <div className='about-historyus'>
                <div className="about-section">
                    <span><h3>ABOUT THE PROJECT</h3></span>
                    <h4>OUR JOURNEY</h4>
                </div>
                <ul>
                    <li>
                        <strong>2021 - Inception</strong>
                        <p>
                            Our journey began in 2021 with the vision of creating a comprehensive and efficient Employee Management System to meet the growing demands of businesses.
                        </p>
                    </li>
                    <li>
                        <strong>2022 - Development</strong>
                        <p>
                            In 2022, we dedicated our efforts to the development and refinement of the EMS, focusing on usability, functionality, and performance.
                        </p>
                    </li>
                    <li>
                        <strong>2023 - Launch</strong>
                        <p>
                            The EMS was officially launched in 2023, marking a significant milestone in our quest to provide businesses with a reliable solution for managing their workforce.
                        </p>
                    </li>
                    <li>
                        <strong>2024 - Growth</strong>
                        <p>
                            As of 2024, we continue to grow and expand the capabilities of the EMS, incorporating user feedback and industry best practices to deliver ongoing improvements.
                        </p>
                    </li>
                    <li>
                        <strong>Future - Innovation</strong>
                        <p>
                            Looking ahead, we are committed to innovation and continuous enhancement, ensuring that the EMS remains at the forefront of employee management technology.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default About;
