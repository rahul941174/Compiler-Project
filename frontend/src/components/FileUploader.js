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
    <div className="file-upload-box"  
          style={{
                  width: '200px',
                  margin: '0 auto',
                  textAlign: 'center',
                  backgroundColor: '#6366f1',
                  padding: '10px',
                  //borderRadius: '5px',
                }}
    >
      <label style={{ cursor: 'pointer', fontWeight: '500', color: 'white', display: 'inline-block', }}>
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
