'use client';

import ErrorBoundary from '@/components/ErrorBoundary';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}