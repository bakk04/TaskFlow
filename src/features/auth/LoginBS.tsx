import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';

export default function LoginBootstrap() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state, dispatch } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const from = (location.state as any)?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (state.user) {
            navigate(from, { replace: true });
        }
    }, [state.user, navigate, from]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await fetch(`http://localhost:4000/users?email=${email}`);
            const users = await res.json();

            if (users.length === 0 || users[0].password !== password) {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: 'Email ou mot de passe incorrect'
                });
                return;
            }

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
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh', backgroundColor: '#f0f0f0' }}
        >
            <Card style={{ maxWidth: '400px', width: '100%', border: 'none' }} className="shadow-sm">
                <Card.Body className="p-4">
                    <h1
                        className="text-center fw-bold mb-1"
                        style={{ color: '#1B8C3E', fontSize: '2rem' }}
                    >
                        TaskFlow
                    </h1>
                    <p className="text-center text-muted mb-4">
                        Connectez-vous pour continuer
                    </p>

                    {state.error && (
                        <Alert variant="danger" className="text-center py-2">
                            {state.error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100 fw-bold py-2"
                            disabled={state.loading}
                            style={{
                                backgroundColor: '#1B8C3E',
                                border: 'none'
                            }}
                        >
                            {state.loading ? 'Connexion...' : 'Se connecter'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}