import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../footer';
import { ThemeProvider } from '../../../context/theme-context';
import { describe, it, expect } from 'vitest';
describe('Footer', () => {
    it('should render the logo', () => {
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <Footer />
                </ThemeProvider>
            </BrowserRouter>
        );
        const logo = screen.getByRole('img', { name: /logo/i });
        expect(logo).toBeInTheDocument();
    });

    it('should render the copyright text', () => {
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <Footer />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(screen.getByText(/© 2024 OSSVerse./i)).toBeInTheDocument();
        expect(screen.getByText(/Connecting Innovators with Security Experts./i)).toBeInTheDocument();
        expect(screen.getByText(/All rights reserved./i)).toBeInTheDocument();
    });

    it('should render all the links', () => {
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <Footer />
                </ThemeProvider>
            </BrowserRouter>
        );


        const links = [
            // { text: 'Platform', href: '/platform' },
            // { text: 'Solutions', href: '/solutions' },
            // { text: 'Resources', href: '/resources' },
            // { text: 'Company', href: '/company' },
            { text: 'Book a Demo', href: '/book-a-demo' },
            { text: 'Explore Marketplace', href: '/marketplace' },
            // { text: 'Get Started', href: '/get-started' },
            { text: 'Sign in', href: '/' },
        ]

        for (const link of links) {
            const linkElement = screen.getByText(link.text);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveAttribute('href', link.href);
        }


    });
});
