import React from 'react';

function FileUploader({ onFileLoad }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      onFileLoad(content); // Pass content to parent
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ margin: '10px auto', width: '80%' }}>
      <input type="file" accept=".c" onChange={handleFileChange} />
    </div>
  );
}

export default FileUploader;
