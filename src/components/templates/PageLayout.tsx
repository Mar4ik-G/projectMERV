// src/components/templates/PageLayout.tsx
import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Magma UI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PageLayout;
