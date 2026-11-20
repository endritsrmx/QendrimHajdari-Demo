import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { searchParams } from './mocks';
import { renderWithIntl } from './test-utils';
import type { CalState } from '@/components/booking/CalEmbed';

// Mock provider: the real Cal.com embed is replaced; the test drives its lifecycle events.
let emit: (s: CalState) => void = () => {};
vi.mock('next/dynamic', () => ({
  default: () =>
    function MockCal(props: { calLink: string; onStateChange: (s: CalState) => void }) {
      emit = props.onStateChange;
      return <div data-testid="mock-cal">{props.calLink}</div>;
    },
}));

const bookingModule = await import('@/config/booking');

async function goToStep3(user: ReturnType<typeof userEvent.setup>, location = 'Royal Medical') {
  await user.click(screen.getByText(location));
  await user.click(screen.getByRole('button', { name: /continue/i }));
  await user.click(screen.getByText('Orthopaedic Consultation'));
  await user.click(screen.getByRole('button', { name: /continue/i }));
}

describe('BookingFlow', () => {
  beforeEach(() => {
    searchParams.delete('location');
    vi.restoreAllMocks();
  });

  it('shows an honest "not connected" state when no provider is configured – never fake slots', async () => {
    const { BookingFlow } = await import('@/components/booking/BookingFlow');
    const user = userEvent.setup();
    renderWithIntl(<BookingFlow />);
    await goToStep3(user);
    expect(screen.getByTestId('booking-not-configured')).toBeInTheDocument();
    expect(screen.getByText(/Online booking is not yet connected/i)).toBeInTheDocument();
    expect(screen.queryByTestId('mock-cal')).not.toBeInTheDocument();
    expect(screen.queryByText(/booking has been received/i)).not.toBeInTheDocument();
  });

  it('pre-selects the location from the URL and starts at step 2', async () => {
    searchParams.set('location', 'ordinanca-dora');
    const { BookingFlow } = await import('@/components/booking/BookingFlow');
    renderWithIntl(<BookingFlow />);
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('Ordinanca Dora, Gjilan')).toBeInTheDocument();
  });

  it('requires consent before loading the provider, then handles loading, error and success', async () => {
    vi.spyOn(bookingModule, 'getCalLink').mockReturnValue('dr-hajdari/consultation-prishtina');
    const { BookingFlow } = await import('@/components/booking/BookingFlow');
    const user = userEvent.setup();
    renderWithIntl(<BookingFlow />);
    await goToStep3(user);

    expect(screen.getByTestId('booking-consent')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-cal')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /load calendar/i }));
    expect(screen.getByTestId('mock-cal')).toHaveTextContent('dr-hajdari/consultation-prishtina');

    act(() => emit('error'));
    expect(screen.getByRole('alert')).toHaveTextContent(/could not be loaded/i);
    await user.click(screen.getByRole('button', { name: /try again/i }));

    act(() => emit('booked'));
    expect(screen.getByText(/booking has been received/i)).toBeInTheDocument();
  });
});
