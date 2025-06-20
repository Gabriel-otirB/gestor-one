"use client";

import { useRouter } from 'next/navigation';
import { FiRefreshCw } from 'react-icons/fi';

const ButtonRefresh = () => {
  const router = useRouter();

  return (
    <button 
    onClick={() => router.refresh()}
    className='bg-gray-900 px-4 py-1 rounded cursor-pointer'
    >
      <FiRefreshCw size={24} color="#fff" />
    </button>
  )
}

export default ButtonRefresh;
