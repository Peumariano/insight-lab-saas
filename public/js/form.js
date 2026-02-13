const form = document.getElementById('insightForm');
const resultsDiv = document.getElementById('results');
const insightsDiv = document.getElementById('insights');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(form);
  const respostas = {};
  
  formData.forEach((value, key) => {
    // Remove espaços extras e valida
    const trimmedValue = value.trim();
    if (trimmedValue) {
      respostas[key] = trimmedValue;
    }
  });

  // Validar se tem pelo menos 3 respostas preenchidas
  const numRespostas = Object.keys(respostas).length;
  if (numRespostas < 3) {
    alert('Por favor, preencha pelo menos 3 campos antes de gerar insights.');
    return;
  }

  console.log('Enviando respostas:', respostas);

  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    // Call API
    const response = await fetch('/api/analisar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(respostas)
    });

    console.log('Status da resposta:', response.status);

    // Tenta ler a resposta como JSON
    const data = await response.json();
    console.log('Dados recebidos:', data);

    if (!response.ok) {
      // Mostra erro específico da API
      const errorMessage = data.message || data.error || 'Erro ao processar a análise';
      throw new Error(errorMessage);
    }

    // Verifica se tem insights
    if (!data.insights) {
      throw new Error('Nenhum insight foi gerado. Tente novamente.');
    }
    
    // Display results
    displayInsights(data.insights);
    
    // Scroll to results
    setTimeout(() => {
      resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    
  } catch (error) {
    console.error('Erro completo:', error);
    
    // Mensagem de erro mais amigável
    let errorMsg = 'Erro ao gerar insights. ';
    
    if (error.message.includes('API Key')) {
      errorMsg += 'Problema com a configuração da API. Entre em contato com o suporte.';
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      errorMsg += 'Limite de uso atingido. Tente novamente mais tarde.';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMsg += 'Problema de conexão. Verifique sua internet.';
    } else {
      errorMsg += error.message || 'Tente novamente.';
    }
    
    alert(errorMsg);
  } finally {
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

function displayInsights(insights) {
  // Show results section
  resultsDiv.classList.remove('hidden');
  
  // Parse and format insights
  const formattedInsights = formatInsights(insights);
  insightsDiv.innerHTML = formattedInsights;
}

function formatInsights(text) {
  // Remove markdown code blocks se existirem
  text = text.replace(/```[\s\S]*?```/g, '');
  
  // Divide o texto em seções principais
  const sections = text.split(/(?=##|\*\*\d+\.|\d+\.\s+\*\*)/g).filter(s => s.trim());
  
  let html = '';
  let insightIndex = 0;
  
  // Ícones para diferentes tipos de seções
  const icons = {
    'análise': 'fa-chart-line',
    'achados': 'fa-search',
    'padrões': 'fa-project-diagram',
    'recomendações': 'fa-lightbulb',
    'ações': 'fa-tasks',
    'prioridades': 'fa-flag',
    'indicadores': 'fa-chart-bar',
    'monitoramento': 'fa-eye',
    'intervenções': 'fa-hand-holding-heart',
    'frequência': 'fa-calendar-check',
    'comportamento': 'fa-users',
    'ambiente': 'fa-school',
    'default': 'fa-info-circle'
  };
  
  // Cores para diferentes seções
  const colors = ['primary', 'success', 'info', 'warning', 'danger'];
  
  sections.forEach((section, index) => {
    if (!section.trim()) return;
    
    // Extrai título da seção
    let title = '';
    let content = section;
    
    // Detecta diferentes formatos de título
    const titleMatch = section.match(/^##\s*(.+?)[\n\r]/m) || 
                      section.match(/^\*\*(.+?)\*\*/m) ||
                      section.match(/^\d+\.\s*\*\*(.+?)\*\*/m) ||
                      section.match(/^💡\s*(.+?)[\n\r]/m) ||
                      section.match(/^#\s*(.+?)[\n\r]/m);
    
    if (titleMatch) {
      title = titleMatch[1].trim();
      content = section.replace(titleMatch[0], '').trim();
    } else {
      // Se não tem título claro, usa as primeiras palavras
      const firstLine = section.split('\n')[0];
      if (firstLine.length < 100) {
        title = firstLine.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim();
        content = section.split('\n').slice(1).join('\n').trim();
      } else {
        title = `Insight ${index + 1}`;
      }
    }
    
    // Remove números e formatação do título
    title = title.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim();
    
    // Determina o ícone baseado no título
    let icon = icons.default;
    const titleLower = title.toLowerCase();
    for (const [key, value] of Object.entries(icons)) {
      if (titleLower.includes(key)) {
        icon = value;
        break;
      }
    }
    
    // Determina a cor
    const colorClass = colors[insightIndex % colors.length];
    insightIndex++;
    
    // Formata o conteúdo
    let formattedContent = formatContent(content);
    
    // Cria o HTML do insight
    html += `
      <div class="insight insight-${colorClass}">
        <div class="insight-header">
          <div class="insight-icon">
            <i class="fas ${icon}"></i>
          </div>
          <h3>${title}</h3>
        </div>
        <div class="insight-content">
          ${formattedContent}
        </div>
      </div>
    `;
  });
  
  // Se não conseguiu dividir em seções, mostra tudo como um insight único
  if (!html) {
    html = `
      <div class="insight insight-primary">
        <div class="insight-header">
          <div class="insight-icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <h3>Análise Completa</h3>
        </div>
        <div class="insight-content">
          ${formatContent(text)}
        </div>
      </div>
    `;
  }
  
  return html;
}

function formatContent(text) {
  if (!text.trim()) return '';
  
  // Remove múltiplos line breaks
  text = text.replace(/\n{3,}/g, '\n\n');
  
  // Converte listas markdown em HTML
  let formatted = text
    // Listas com asterisco
    .replace(/^\*\s+(.+)$/gm, '<li>$1</li>')
    // Listas com hífen
    .replace(/^-\s+(.+)$/gm, '<li>$1</li>')
    // Listas numeradas
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
  
  // Agrupa itens de lista consecutivos
  formatted = formatted.replace(/(<li>.*?<\/li>\n?)+/g, (match) => {
    return '<ul>' + match + '</ul>';
  });
  
  // Converte parágrafos (texto que não está em listas)
  formatted = formatted.split('\n\n').map(paragraph => {
    paragraph = paragraph.trim();
    if (!paragraph) return '';
    
    // Se já é uma lista ou HTML, retorna como está
    if (paragraph.startsWith('<ul>') || paragraph.startsWith('<ol>') || paragraph.startsWith('<li>')) {
      return paragraph;
    }
    
    // Remove asteriscos de negrito markdown e adiciona tags HTML
    paragraph = paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Se tem menos de 10 palavras e termina com :, é um subtítulo
    if (paragraph.split(' ').length < 10 && paragraph.endsWith(':')) {
      return `<h4 style="color: var(--gray-900); font-weight: 600; margin: 1.5rem 0 0.75rem 0; font-size: 1.1rem;">${paragraph}</h4>`;
    }
    
    return `<p>${paragraph}</p>`;
  }).join('\n');
  
  // Remove quebras de linha extras
  formatted = formatted.replace(/\n{2,}/g, '\n');
  
  return formatted;
}

// Copy insights to clipboard
function copyInsights() {
  const text = insightsDiv.innerText;
  
  navigator.clipboard.writeText(text).then(() => {
    alert('Insights copiados para a área de transferência!');
  }).catch(err => {
    console.error('Erro ao copiar:', err);
    alert('Erro ao copiar. Por favor, selecione e copie manualmente.');
  });
}

// Character counter for textareas
document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('input', function() {
    const length = this.value.length;
    if (length > 500) {
      this.style.borderColor = 'var(--primary-color)';
    } else {
      this.style.borderColor = 'var(--gray-200)';
    }
  });
});

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
});

// Form validation feedback
form.addEventListener('submit', function(e) {
  let isValid = true;
  
  document.querySelectorAll('textarea[required]').forEach(textarea => {
    if (!textarea.value.trim()) {
      textarea.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      textarea.style.borderColor = 'var(--gray-200)';
    }
  });
  
  if (!isValid) {
    e.preventDefault();
    alert('Por favor, preencha todos os campos obrigatórios.');
  }
});