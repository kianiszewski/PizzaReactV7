import styles from './Header.module.css'; 

const Header = ({title = 'Titulo', subtitle = 'Subtitulo'}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
};
export default Header;