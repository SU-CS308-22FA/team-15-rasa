import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Sign in</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;