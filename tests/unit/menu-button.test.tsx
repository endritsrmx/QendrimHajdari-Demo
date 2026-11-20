import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuButton } from '@/components/navigation/MenuButton';

describe('MenuButton', () => {
  it('exposes aria-expanded and aria-controls and is keyboard operable', async () => {
    const onClick = vi.fn();
    const { rerender } = render(<MenuButton open={false} onClick={onClick} label="Open menu" controls="site-menu" text="Menu" />);
    const btn = screen.getByRole('button', { name: 'Open menu' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(btn).toHaveAttribute('aria-controls', 'site-menu');
    btn.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<MenuButton open onClick={onClick} label="Close menu" controls="site-menu" text="Close" />);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  });
});
