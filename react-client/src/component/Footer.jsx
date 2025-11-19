import React from 'react'

const year = new Date().getFullYear();

function Footer() {
    return (
        <footer>
            <p>Copyright © {year} C.H.E.E.R.S. - All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;