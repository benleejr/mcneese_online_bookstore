//Add.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useRef } from 'react';

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('book');
  const [image, setImage] = useState('');
  const fileInputRef = useRef(null);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.secure_url;
      setImage(imageUrl);  // Set the image URL in your state
      // ... rest of your code
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Post</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <div>
            <input
              type="radio"
              id="book"
              name="type"
              value="book"
              checked={type === 'book'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="book">Book</label>
          </div>
          <div>
            <input
              type="radio"
              id="stationery"
              name="type"
              value="stationery"
              checked={type === 'stationery'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="stationery">Stationery</label>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
          />
          <input disabled={!content || !title || !image} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Create;
