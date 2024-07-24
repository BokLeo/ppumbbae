"use client";

// src/app/page.tsx
import useSWR from 'swr';
import type { FC } from 'react';

interface User {
  id: number;
  participant_name: string;
  amount: number;
  date: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: FC = () => {
  const { data, error } = useSWR<User[]>("api/data", fetcher);

  

  if (error) {
    console.error(error);
    
    return (
      <div>
        Failed to load
        <div>{error.message}</div>
      </div>
    );
  }
  if (!data) return <div>Loading...</div>;

  
  return (
    <div>
      <h1>User Data</h1>

      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.participant_name}: ${user.amount} - {new Date(user.date).toLocaleString()}
          </li>
        ))}
      </ul>

      {/* about페이지로 이동하는 버튼 생성   */}
      <a href="/about">About</a>
    </div>
  );
};

export default Home;
