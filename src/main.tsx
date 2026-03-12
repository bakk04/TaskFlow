import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import App from "./App.tsx";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import './index.css'
<<<<<<< HEAD

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
=======
import App from './App.tsx'
import {AuthProvider} from "./features/auth/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
>>>>>>> eb8dc27a5d5e342909aef40e2cf5eb5c1c6a6aad
