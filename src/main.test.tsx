import { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';
import { describe, expect, it } from 'vitest';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

describe('Main Application', () => {

    it('renders without crashing', () => {
        const rootElement = document.createElement('div');
        rootElement.id = 'root';
        document.body.appendChild(rootElement);

        const queryClient = new QueryClient();
        createRoot(rootElement).render(
            <StrictMode>
                <Providers queryClient={queryClient} />
                <Toaster />
            </StrictMode>,
        );


        expect(rootElement).toBeTruthy();
    });
});
