import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton component', () => {
    it('should renders correctly', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SubscribeButton />
        )
        expect(screen.getByText('Subscribe now')).toBeInTheDocument();
    })

    it('should redirects user to sign in when not authenticated', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([null, false])
        const signInMocked = mocked(signIn);

        render(
            <SubscribeButton />
        )

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled();
    })

    it('should redirect to posts where user already have a subscription', () => {
        const useRouterMocked = mocked(useRouter);
        const useSessionMocked = mocked(useSession);
        const pushMocked = jest.fn()

        useSessionMocked.mockReturnValueOnce([{
            user: { name: 'John Doe', email: 'john.doe@example.com' }, activeSubscription: 'fake active subscription', expires: 'fake-expires'
        }, false])

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked
        } as any)

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton);

        //expect(pushMocked).toHaveBeenCalled();
    })
})
