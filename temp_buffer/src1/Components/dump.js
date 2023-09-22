// Login
function check() {
    var userName = document.getElementById('login-id').value;
    var password = document.getElementById('password').value;
    const navigate = useNavigate();

    var valid = [false, false, false];

    var valid = users.map(function (item) {
        if (userName === item.id && item.key === password) {
            return true;
        }
        return false;
    });



    alert(valid);
    if (valid.includes(true)) {
        alert("Welcome " + userName + " with password " + password + "!!");
        // navigate('/register'); 
    } else {
        alert("Invalid user!!");
    }
}




// Navbar
const [toggleIcon, setToggle] = useState("navbar-toggler");

const navToggle = () => {
    // toggle icon
    toggleIcon === 'navbar-toggler' ? setToggle('navbar-toggler toggle') : setToggle('navbar-toggler');
};


{/* Brand Name */ }
<nav className="navbar">
    <h1 className="navbar-heading">
        <img
            src={require('./img/logo_transparent.png')}
            width="80"
            height="80"
            className="d-inline-block align-top navbar-heading-img"
            alt="React Bootstrap logo"
        />{' '}
        SmartSchool
    </h1>

    <ul className='navbar-tags'>
        <li className="navbar-home">Home</li>
        <li className="navbar-about-us">About Us</li>
        <li>
            <NavDropdown title="More" id="basic-nav-dropdown" className="navbar-dropdown navbar-more">
                <NavDropdown.Item href="">Our System</NavDropdown.Item>
                <NavDropdown.Item href="">Contact Us</NavDropdown.Item>
                <NavDropdown.Item href="">FAQs</NavDropdown.Item>
            </NavDropdown>
        </li>
        <li>
            <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
                className="navbar-button navbar-login"
            >
                {isLoading ? 'Loading..' : 'Login'}
            </Button>
        </li>
    </ul>

    <div className="navbar-toggler" onClick={navToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
    </div>

    <div className='navbar-tags-compressed'>
        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
            className="navbar-button navbar-login"
        >
            {isLoading ? 'Loading..' : 'Login'}
        </Button>
        <li className="navbar-home">Home</li>
        <li className="navbar-about-us">About Us</li>
        <li className="navbar-our-system">Our System</li>
        <li className="navbar-contact-us">Contact Us</li>
        <li className="navbar-faqs">FAQs</li>
    </div>
</nav>