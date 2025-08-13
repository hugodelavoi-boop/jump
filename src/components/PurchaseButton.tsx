import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { createCheckoutSession } from '../lib/stripe';
import Button from './Button';
import AuthWrapper from './AuthWrapper';

interface PurchaseButtonProps {
  priceId: string;
  mode: 'payment' | 'subscription';
  children: React.ReactNode;
  className?: string;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ priceId, mode, children, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  const handlePurchase = async () => {
    try {
      setIsLoading(true);

      const successUrl = `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = window.location.href;

      const checkoutUrl = await createCheckoutSession(
        priceId,
        mode,
        session.access_token,
        successUrl,
        cancelUrl,
      );

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper requiredForAction="make a purchase">
      <Button
        variant="primary"
        onClick={handlePurchase}
        disabled={isLoading}
        className={className}
      >
        {isLoading ? 'Loading...' : children}
      </Button>
    </AuthWrapper>
  );
};

export default PurchaseButton;