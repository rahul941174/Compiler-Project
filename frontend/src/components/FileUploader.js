import React from 'react';

function FileUploader({ onFileLoad }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      onFileLoad(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="file-upload-box">
      <label style={{ cursor: 'pointer', fontWeight: '500', color: '#1e3a8a' }}>
        📁 Upload .c file:
        <input
          type="file"
          accept=".c"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}

export default FileUploader;
