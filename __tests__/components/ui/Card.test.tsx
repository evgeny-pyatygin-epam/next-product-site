import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardContent, CardFooter } from '@/src/components/ui/Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders basic card', () => {
      render(
        <Card data-testid='card'>
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow-sm');
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
      const { rerender } = render(
        <Card data-testid='card' variant='default'>
          Default
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveClass('shadow-sm');

      rerender(
        <Card data-testid='card' variant='elevated'>
          Elevated
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveClass('shadow-lg');

      rerender(
        <Card data-testid='card' variant='outlined'>
          Outlined
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveClass('border-2');
    });

    it('applies hover effect when hover prop is true', () => {
      render(
        <Card data-testid='card' hover>
          Hoverable
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveClass('hover:shadow-md', 'transition-shadow');
    });

    it('applies interactive classes when interactive prop is true', () => {
      render(
        <Card data-testid='card' interactive>
          Interactive
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveClass('hover:bg-gray-50', 'cursor-pointer');
    });

    it('handles click events when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Card data-testid='card' interactive onClick={handleClick}>
          Interactive Card
        </Card>
      );

      await user.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Card data-testid='card' interactive onClick={handleClick}>
          Interactive Card
        </Card>
      );

      const card = screen.getByTestId('card');
      card.focus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
      render(
        <Card data-testid='card' className='custom-class'>
          Custom
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });
  });

  describe('CardHeader', () => {
    it('renders card header', () => {
      render(
        <CardHeader data-testid='header'>
          <div>Header content</div>
        </CardHeader>
      );

      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('px-6', 'py-4', 'border-b', 'border-gray-200');
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardHeader data-testid='header' className='custom-header'>
          Header
        </CardHeader>
      );
      expect(screen.getByTestId('header')).toHaveClass('custom-header');
    });
  });

  describe('CardContent', () => {
    it('renders card content', () => {
      render(
        <CardContent data-testid='content'>
          <div>Content area</div>
        </CardContent>
      );

      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('px-6', 'py-4');
      expect(screen.getByText('Content area')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardContent data-testid='content' className='custom-content'>
          Content
        </CardContent>
      );
      expect(screen.getByTestId('content')).toHaveClass('custom-content');
    });
  });

  describe('CardFooter', () => {
    it('renders card footer', () => {
      render(
        <CardFooter data-testid='footer'>
          <div>Footer content</div>
        </CardFooter>
      );

      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('px-6', 'py-4', 'border-t', 'border-gray-200', 'bg-gray-50');
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardFooter data-testid='footer' className='custom-footer'>
          Footer
        </CardFooter>
      );
      expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
    });
  });
});
