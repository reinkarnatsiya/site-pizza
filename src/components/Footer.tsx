import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p>Все материалы используются исключительно в учебных целях. Права на товарные знаки, изображения и прочие объекты интеллектуальной собственности принадлежат соответствующим правообладателям.</p>
            </div>
        </footer>
    );
};

export default Footer;