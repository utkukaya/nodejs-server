import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    myFile: null,
  });
  const [outputMessage, setOutputMessage] = useState('');

  const preventFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // FormData nesnesini oluşturun ve verileri ekleyin
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      // Fetch ile POST isteği gönderin
      const response = await fetch('https://script.google.com/macros/s/AKfycbygHiwtMF40KwTyWmtOTY-MpB49I6LgY0iB17Pnr-T5NfQ6JV9bvGYJc-s_6TN3KtEDkA/exec', {
        method: 'POST',
        body: formDataToSend,
        headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors', 
      });

      if (response.ok) {
        // Başarılı yanıtı işleyin
        const result = await response.json();
        setOutputMessage('File uploaded successfully!');
        document.getElementById('myForm').reset();
      } else {
        // Hata durumunda işlem yapın
        setOutputMessage('An error occurred while uploading the file.');
      }
    } catch (error) {
      // Hata durumunda işlem yapın
      setOutputMessage('An error occurred: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // Dosyayı saklayın
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <form id="myForm" onSubmit={handleFormSubmit}>
            <p className="h4 mb-4 text-center">Contact Details</p>
            {/* Diğer form alanları buraya gelecek */}
            <div className="form-group">
              <label htmlFor="FormControlFile">Photo</label>
              <input
                name="myFile"
                className="form-control-file"
                type="file"
                id="FormControlFile"
                onChange={handleInputChange}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
          <br />
          <div id="output" className="alert">
            {outputMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
