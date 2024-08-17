import React from 'react';
import PageLayout from '../components/templates/PageLayout';

const Home: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to the Home Page!</h1>
      </div>
    </PageLayout>
  );
};

export default Home;
