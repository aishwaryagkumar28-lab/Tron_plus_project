const apiUrl = 'http://localhost:3000';

document.getElementById('uploadBtn').addEventListener('click', async () => {
  const file = document.getElementById('pdfFile').files[0];
  if (!file) return alert('Please choose a PDF file.');
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(apiUrl + '/upload', { method: 'POST', body: formData });
  const data = await res.json();
  alert(data.message);
});

document.getElementById('askBtn').addEventListener('click', async () => {
  const question = document.getElementById('question').value;
  if (!question) return alert('Enter your question first.');
  const res = await fetch(apiUrl + '/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  const data = await res.json();
  document.getElementById('answer').innerText = data.answer;
});
