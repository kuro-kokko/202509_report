// 型定義（コメントで記述）
// interface User {
//   id: number;
//   name: string;
//   age: number;
//   del_flg: boolean;
// }
// interface SearchResponse {
//   users: User[];
//   total: number;
// }
// interface ErrorResponse {
//   error: string;
// }

class SearchApp {
  constructor() {
    this.form = document.getElementById('searchForm');
    this.input = document.getElementById('searchInput');
    this.button = document.getElementById('searchButton');
    this.errorDiv = document.getElementById('error');
    this.resultDiv = document.getElementById('result');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSearch();
    });
  }

  async handleSearch() {
    const name = this.input.value.trim();

    // バリデーション
    if (!name) {
      this.showError('検索名を入力してください');
      return;
    }

    this.setLoading(true);
    this.hideError();

    try {
      const response = await fetch(`http://localhost:3000/api/search?name=${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      this.displayResults(data, name);
    } catch (error) {
      this.showError(error instanceof Error ? error.message : '検索エラーが発生しました');
    } finally {
      this.setLoading(false);
    }
  }

  displayResults(data, searchTerm) {
    if (data.users.length === 0) {
      this.resultDiv.innerHTML = `
        <div class="no-results">
          「${searchTerm}」に一致するユーザーが見つかりませんでした
        </div>
      `;
      return;
    }

    const userItems = data.users.map(user => `
      <div class="user-item">
        <div>
          <div class="user-name">${this.escapeHtml(user.name)}</div>
          <div class="user-age">${user.age}歳</div>
        </div>
        <div>ID: ${user.id}</div>
      </div>
    `).join('');

    this.resultDiv.innerHTML = `
      <h3>検索結果: ${data.total}件</h3>
      ${userItems}
    `;
  }

  showError(message) {
    this.errorDiv.textContent = message;
    this.errorDiv.style.display = 'block';
  }

  hideError() {
    this.errorDiv.style.display = 'none';
  }

  setLoading(loading) {
    this.button.disabled = loading;
    this.button.textContent = loading ? '検索中...' : '検索';
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// アプリケーション初期化
new SearchApp();
