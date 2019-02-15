import React from 'react';
import { css } from "emotion";

const styles = {
  container: css`
    background: #000;
    height: 60px;
    display: flex;
    align-items: center;
  `,
  logo: css`
    width: 150px;
    height: auto;
    margin: 0 20px;
  `
}

const Header = () => (
  <header className={styles.container}>
    <img className={styles.logo} src="https://signin.securetempus.com/client/assets/images/tempus-white-logo.png" />
  </header>
)

export default Header;