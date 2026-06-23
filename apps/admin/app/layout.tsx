import React from 'react';

export const metadata = {
  title: 'CampusOS Admin Command Center',
  description: 'TITAN X System Administration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
