import styles from './Header.module.css';

interface HeaderProps {
    title: string;
    onMenuClick: () => void;
    userName?: string;
    onLogout?: () => void;
}

export default function Header({ title, onMenuClick, userName, onLogout }: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <button className={styles.menuBtn} onClick={onMenuClick}>☰</button>
                <h1 className={styles.logo}>{title}</h1>
            </div>
            <div className={styles.right}>
                {userName && (
                    <div className={styles.userSection}>
                        <div className={styles.avatar}>
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <span className={styles.userName}>{userName}</span>
                    </div>
                )}
                {onLogout && (
                    <button className={styles.logoutBtn} onClick={onLogout}>
                        Déconnexion
                    </button>
                )}
            </div>
        </header>
    );
}