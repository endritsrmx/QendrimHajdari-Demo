import { describe, expect, it, vi, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './mocks';
import { renderWithIntl } from './test-utils';
import { ContactForm } from '@/components/forms/ContactForm';

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), 'Arta Krasniqi');
  await user.type(screen.getByLabelText(/^email/i), 'arta@example.com');
  await user.selectOptions(screen.getByLabelText(/preferred location/i), 'royal-medical');
  await user.type(screen.getByLabelText(/^message/i), 'I would like to book a consultation.');
  await user.click(screen.getByRole('checkbox'));
}

describe('ContactForm', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows accessible, translated validation errors', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Please confirm the privacy notice.')).toBeInTheDocument();
  });

  it('never claims success when no e-mail provider is configured', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false, code: 'not_configured' }), { status: 503 })));
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/has NOT been sent/i)).toBeInTheDocument();
    expect(screen.queryByText(/has been sent\. We will/i)).not.toBeInTheDocument();
  });

  it('confirms delivery when the API succeeds', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })));
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/Your message has been sent/i)).toBeInTheDocument();
  });

  it('renders in Albanian', () => {
    renderWithIntl(<ContactForm />, 'sq');
    expect(screen.getByRole('button', { name: /dërgo mesazhin/i })).toBeInTheDocument();
  });
});
