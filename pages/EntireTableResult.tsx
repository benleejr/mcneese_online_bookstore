//pages/EntireTableResult.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'; 
import Layout from '../components/Layout'; 

const EntireTableResult: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { table } = router.query;
  const [results, setResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    if (query.table) {
      fetchResults(query.table as string, currentPage);
    }
  }, [query.table, currentPage]);

  const fetchResults = async (table: string, page: number) => {
    try {
      const response = await axios.get(`/api/searchTable`, { params: { table, page } });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      <div className="gridContainer">
        {results.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`} passHref>
            <div className="gridItem">
              <Image src={item.primaryImageURL} alt={item.name || item.title} width={100} height={100} layout="responsive" />
              <p className="itemTitle">{item.name || item.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .gridContainer {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-gap: 16px;
          padding: 16px;
        }

        .gridItem {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .itemImage {
          max-width: 100%;
          height: auto; // or set a fixed height
        }

        .itemTitle {
          margin-top: 8px;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default EntireTableResult;