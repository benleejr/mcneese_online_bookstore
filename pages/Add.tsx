import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import cloudinary from '../cloudinaryConfig';

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('book');
  const [image, setImage] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const uploadResponse = await cloudinary.v2.uploader.upload(image, { public_id: title });
      const imageUrl = uploadResponse.secure_url;
      const body = { title, content, type, imageUrl };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
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
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            type="text"
            value={image}
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
