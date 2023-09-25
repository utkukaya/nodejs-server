import React, { useState } from 'react';
import { jsPDF } from "jspdf";

function FormDatas() {
    const [selectedFile, setSelectedFile] = useState(null);

    const uploadPDF = async (pdfData) => {
        const folderId = '1LuwKXFara7I_uXBWObtv-Hc4EOsw7u8i'; // Google Drive'da yüklemek istediğiniz klasörün ID'si
        const scriptUrl = "https://script.google.com/macros/s/AKfycbxMqW96yeY3R2bYyc6bYVu_siJ92rG-kxVZ3jcZoJxccODF6-NCWK7mYRJCIk5YLseSdA/exec"

        const base64Data = await convertToBase64(pdfData);
        console.log("base :", base64Data)
        // const requestData = {
        //     pdfData: base64Data,
        //     folderId: folderId,
        // };
        var requestData = {
            Name: 'John Doe',
            Email: 'johndoe@example.com',
            Message: 'Merhaba, bu bir test mesajıdır.'
          };
        // fetch(scriptUrl)
        //     .then(response => response.text())
        //     .then(data => console.log(data))
        //     .catch(error => console.error(error));



        const accessToken = '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';

        // const response = await fetch(scriptUrl, {
        //     method: 'POST',
        //     body: JSON.stringify(requestData),
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`,
        //         'Content-Type': 'application/json',
        //     },
        //     mode: 'no-cors', // CORS politikalarını atla
        // })
        // if (response.ok) {
        //     const result = await response.json();
        //     console.log('Yüklenen Dosyanın ID\'si:', result);
        // } else {
        //     console.error('Dosya yüklenirken hata oluştu.', response);
        // }
        fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            mode: 'no-cors', // CORS politikalarını atla
        })
            .then(function(response) {
              if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
              }
              return response.text();
            })
            .then(function(data) {
              console.log('Google Apps Script yanıtı:', data);
            })
            .catch(function(error) {
              console.error('Hata:', error);
            });
    };


    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    }





    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file);

        if (file) {

            uploadPDF(file)
        } else {
        }
    };

    return (
        <form>
            <h3>Fill the Form</h3>
            <div className="mb-3">
                <label>Email (optional)</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>File</label>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn submit-button">
                    Submit
                </button>

            </div>
        </form>
    );
}

export default FormDatas;
