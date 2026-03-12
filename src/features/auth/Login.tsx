<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from '../../api/axios';
import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
=======
import { useState } from 'react';
import { useAuth } from './AuthContext';
import styles from './Login.module.css';

export default function Login() {
>>>>>>> eb8dc27a5d5e342909aef40e2cf5eb5c1c6a6aad
    const { state, dispatch } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

<<<<<<< HEAD
    const from = (location.state as any)?.from || '/dashboard';

    useEffect(() => {
        if (state.user) navigate(from, { replace: true });
    }, [state.user, navigate, from]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const { data: users } = await api.get(`/users?email=${email}`);
=======
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await fetch(
                `http://localhost:4000/users?email=${email}`
            );
            const users = await res.json();

>>>>>>> eb8dc27a5d5e342909aef40e2cf5eb5c1c6a6aad
            if (users.length === 0 || users[0].password !== password) {
                dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' });
                return;
            }
<<<<<<< HEAD
            const { password: _, ...user } = users[0];
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
=======

            const { password: _, ...user } = users[0];
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur de connexion au serveur' });
>>>>>>> eb8dc27a5d5e342909aef40e2cf5eb5c1c6a6aad
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>TaskFlow</h1>
                <p className={styles.subtitle}>Connectez-vous pour continuer</p>
<<<<<<< HEAD
                {state.error && <div className={styles.error}>{state.error}</div>}
                <input type="email" placeholder="Email"
                       value={email} onChange={e => setEmail(e.target.value)}
                       className={styles.input} required />
                <input type="password" placeholder="Mot de passe"
                       value={password} onChange={e => setPassword(e.target.value)}
                       className={styles.input} required />
                <button type="submit" className={styles.button} disabled={state.loading}>
=======

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
>>>>>>> eb8dc27a5d5e342909aef40e2cf5eb5c1c6a6aad
                    {state.loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>
        </div>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> eb8dc27a5d5e342909aef40e2cf5eb5c1c6a6aad
