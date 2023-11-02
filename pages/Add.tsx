//Add.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useRef } from 'react';

const Create: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [type, setType] = useState('book');
  
  const primaryFileInputRef = useRef(null);
  const otherFilesInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!primaryFileInputRef.current || !primaryFileInputRef.current.files || primaryFileInputRef.current.files.length === 0) {
      console.error('No image selected');
      return;
    }

    //Add image to multer
    const formDataObj = new FormData();

    try {
      // Process primary image
      
      const primaryFormData = new FormData();
      primaryFormData.append('file', primaryFileInputRef.current.files[0]);

      const primaryUploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: primaryFormData,
      });

      if (!primaryUploadResponse.ok) {
        const uploadData = await primaryUploadResponse.json();
        console.error('Error saving data:', uploadData.error);
        return;
      } 

      const primaryUploadData = await primaryUploadResponse.json();
      const primaryImageURL = primaryUploadData.secure_url;
      formDataObj.append('primaryImageURL', primaryImageURL);
      

    if (otherFilesInputRef.current && otherFilesInputRef.current.files && otherFilesInputRef.current.files.length > 0) {
      const otherImageURLs = [];
      for (let i = 0; i < otherFilesInputRef.current.files.length; i++) {
        const otherFormData = new FormData();
        otherFormData.append('file', otherFilesInputRef.current.files[i]);
    
        const otherUploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: otherFormData,
        });
    
        if (!otherUploadResponse.ok) {
          const uploadData = await otherUploadResponse.json();
          console.error('Error saving data:', uploadData.error);
          return;
        }
    
        const otherUploadData = await otherUploadResponse.json();
        const otherImageURL = otherUploadData.secure_url;
        otherImageURLs.push(otherImageURL);
      }
      formDataObj.append('otherImageURLs', JSON.stringify(otherImageURLs));  // Convert array to string to make it compatible with the PostgreSQL database.
    }
         
    /*for(let key of formDataObj.keys()) {
        formDataObj.delete(key);
    }*/

      formDataObj.append('type', type);    
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      console.log([...formDataObj.entries()]);

      const saveResponse = await fetch('/api/save', {
          method: 'POST',
          body: formDataObj,
      });

      if (!saveResponse.ok) {
          const saveData = await saveResponse.json();
          console.error('Error saving data:', saveData.error);
      } else {
          Router.push('/');  // Redirect to the home page or wherever is appropriate
      }

    } catch (error) {
      console.error(error);
    }
  };
  //End submitData()

  return (
    <Layout>
      <div>
      <form onSubmit={submitData} encType="multipart/form-data">
          <h1>Add New Product</h1>
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
          <div>
            <h2>Upload Primary Image</h2>
            <input type="file" accept="image/*" ref={primaryFileInputRef} required />
          </div>

          <div>
            <h2>Upload Other Images</h2>
            <input type="file" accept="image/*" ref={otherFilesInputRef} multiple />
          </div>
          {type === 'book' && (
            <>
              <input name="title" placeholder="Title" onChange={handleInputChange} />
              <input name="author" placeholder="Author" onChange={handleInputChange} />
              <input name="ISBN" placeholder="ISBN" onChange={handleInputChange} />
              <input name="category" placeholder="Category" onChange={handleInputChange} />
              <input name="price" placeholder="Price" type="number" step="0.01" onChange={handleInputChange} />
              <input name="language" placeholder="Language" onChange={handleInputChange} />
              <input name="availability" type="checkbox" checked={formData.availability} onChange={e => handleInputChange({ target: { name: 'availability', value: e.target.checked } })} /> Available
              <input name="description" placeholder="Description" onChange={handleInputChange} />
              <input name="publisher" placeholder="Publisher" onChange={handleInputChange} />
              <input name="publishedYear" placeholder="Published Year" type="number" onChange={handleInputChange} />
              <input name="stock" placeholder="Stock" type="number" onChange={handleInputChange} />
            </>
          )}
          {type === 'stationery' && (
            <>
              <input name="name" placeholder="Name" onChange={handleInputChange} />
              <input name="brand" placeholder="Brand" onChange={handleInputChange} />
              <input name="price" placeholder="Price" type="number" step="0.01" onChange={handleInputChange} />
              <input name="availability" type="checkbox" checked={formData.availability} onChange={e => handleInputChange({ target: { name: 'availability', value: e.target.checked } })} /> Available
              <input name="description" placeholder="Description" onChange={handleInputChange} />
              <input name="category" placeholder="Category" onChange={handleInputChange} />
              <input name="stock" placeholder="Stock" type="number" onChange={handleInputChange} />
            </>
          )}

          <input type="submit" value="Create" />
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
        input[type='number'],
        input[type='checkbox'],
        input[type='submit'],
        input[type='file'],
        textarea {
          display: block;  /* Ensures that the input elements are stacked */
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='sub1t'] {
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
