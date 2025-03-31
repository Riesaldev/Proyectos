
const Header = () => {
    return (
        <header>
            <a href="./index.html">
                <img src="./assets/images/logo.svg" alt="Logo" class="logo" />
            </a>
            <button class="mode-toggle" label="Toggle light mode">
                <img src="./assets/images/icon-moon.svg" alt="Light mode icon" />
            </button>
        </header>
    );
}
export default Header;