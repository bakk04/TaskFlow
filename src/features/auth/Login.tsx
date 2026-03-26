import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state, dispatch } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Détermine où rediriger l'utilisateur après connexion
    const from = (location.state as any)?.from?.pathname || '/dashboard';

    // Redirige automatiquement si l'utilisateur est déjà connecté
    useEffect(() => {
        if (state.user) {
            navigate(from, { replace: true });
        }
    }, [state.user, navigate, from]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            // Simulation d'authentification via json-server
            const res = await fetch(`http://localhost:4000/users?email=${email}`);
            const users = await res.json();

            // Vérification simple (Attention: ne jamais faire ça en production !)
            if (users.length === 0 || users[0].password !== password) {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: 'Email ou mot de passe incorrect'
                });
                return;
            }

            // On retire le mot de passe de l'objet utilisateur avant de le stocker
            const { password: _, ...userWithoutPassword } = users[0];

            dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });

        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: 'Erreur de connexion au serveur'
            });
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>TaskFlow</h1>
                <p className={styles.subtitle}>Connectez-vous pour continuer</p>

                {state.error && <div className={styles.error}>{state.error}</div>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />

                <button
                    type="submit"
                    className={styles.button}
                    disabled={state.loading}
                >
                    {state.loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>
        </div>
    );
}