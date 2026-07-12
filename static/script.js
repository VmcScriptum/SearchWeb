document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('pdf-file');
  const fileList = document.getElementById('file-list');
  const searchInput = document.getElementById('search-query');
  const searchBtn = document.getElementById('search-btn');
  const resultsContainer = document.getElementById('results-container');

  let uploadedFiles = [];

  // Drop zone events
  dropZone.addEventListener('click', () => {
    fileInput.click();
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drop-zone--over');
  });

  ['dragleave', 'dragend'].forEach(type => {
    dropZone.addEventListener(type, () => {
      dropZone.classList.remove('drop-zone--over');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drop-zone--over');

    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFiles(fileInput.files);
    }
  });

  function handleFiles(files) {
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');

    if (pdfFiles.length === 0 && files.length > 0) {
      alert('Por favor, envie apenas arquivos PDF.');
      return;
    }

    pdfFiles.forEach(file => {
      if (!uploadedFiles.some(f => f.name === file.name)) {
        uploadedFiles.push(file);
        addFileToUI(file);
      }
    });

    updatePlaceholderState();
  }

  function addFileToUI(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';

    const fileName = document.createElement('span');
    fileName.className = 'file-item__name';
    fileName.textContent = file.name;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'file-item__remove';
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      uploadedFiles = uploadedFiles.filter(f => f !== file);
      fileItem.remove();
      updatePlaceholderState();
    });

    fileItem.appendChild(fileName);
    fileItem.appendChild(removeBtn);
    fileList.appendChild(fileItem);
  }

  function updatePlaceholderState() {
    if (uploadedFiles.length === 0) {
      resultsContainer.innerHTML = `<p class="placeholder-text">Nenhum resultado para exibir. Carregue um PDF e digite um termo de pesquisa para começar.</p>`;
    }
  }

  // Handle mock and backend-friendly search
  searchBtn.addEventListener('click', () => {
    performSearch();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      alert('Por favor, digite um termo de pesquisa.');
      return;
    }

    if (uploadedFiles.length === 0) {
      alert('Por favor, carregue pelo menos um arquivo PDF primeiro.');
      return;
    }

    resultsContainer.innerHTML = '<p class="placeholder-text">Processando pesquisa...</p>';

    // Simulate search delay and generate realistic matching mock results
    setTimeout(() => {
      resultsContainer.innerHTML = '';

      const matchedResults = [];
      uploadedFiles.forEach(file => {
        // Mocking some dummy content search results
        matchedResults.push({
          file: file.name,
          text: `... encontrado trecho relevante contendo "<mark>${query}</mark>" no documento ${file.name}. Este resultado foi processado com sucesso.`,
          page: Math.floor(Math.random() * 20) + 1
        });
        matchedResults.push({
          file: file.name,
          text: `... outra ocorrência de "<mark>${query}</mark>" encontrada no parágrafo 3 da seção de conclusões deste PDF.`,
          page: Math.floor(Math.random() * 20) + 21
        });
      });

      matchedResults.forEach(res => {
        const card = document.createElement('div');
        card.className = 'result-card';

        const title = document.createElement('div');
        title.className = 'result-card__title';
        title.textContent = res.file;

        const text = document.createElement('div');
        text.className = 'result-card__text';
        text.innerHTML = res.text;

        const meta = document.createElement('div');
        meta.className = 'result-card__meta';
        meta.textContent = `Página ${res.page}`;

        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(meta);
        resultsContainer.appendChild(card);
      });
    }, 800);
  }
});
