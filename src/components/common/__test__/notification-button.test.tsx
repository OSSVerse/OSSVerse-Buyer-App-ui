import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import NotificationButton from '../notification-button';

describe('NotificationButton Component', () => {
    it('renders without crashing', () => {
        render(<NotificationButton />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders the notification icon', () => {
        render(<NotificationButton />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders the notification badge', () => {
        render(<NotificationButton />);
        expect(screen.getByText('', { selector: 'span' })).toBeInTheDocument();
    });

    it('has the correct button class', () => {
        render(<NotificationButton />);
        expect(screen.getByRole('button')).toHaveClass('rounded-full relative');
    });

    it('has the correct badge class', () => {
        render(<NotificationButton />);
        expect(screen.getByText('', { selector: 'span' })).toHaveClass('absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center');
    });

    it('renders notification button', () => {
        render(<NotificationButton />);

        const notificationButton = screen.getByRole('button');
        expect(notificationButton).toBeInTheDocument();
    });


});
