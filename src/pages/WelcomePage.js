import { Link } from 'react-router-dom';
import './WelcomePage.css'


const WelcomePage = () => {
    return <section className="welcome-section">
        <div>
            <h1>Welcome to banking-app</h1>
            <div className='btn-container'>
                <Link to='api/users/login' className='btn' type="button">Login</Link>
                <span>/</span>
                <Link to='api/users/registration' className='btn' type="button">Register</Link>
            </div>
        </div>
    </section>
}
export default WelcomePage;