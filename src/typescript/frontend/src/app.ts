import { User, SearchResponse, ErrorResponse } from './types.js';

class SearchApp {
  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private button: HTMLButtonElement;
  private errorDiv: HTMLDivElement;
  private resultDiv: HTMLDivElement;

  constructor() {
    this.form = document.getElementById('searchForm') as HTMLFormElement;
    this.input = document.getElementById('searchInput') as HTMLInputElement;
    this.button = document.getElementById('searchButton') as HTMLButtonElement;
    this.errorDiv = document.getElementById('error') as HTMLDivElement;
    this.resultDiv = document.getElementById('result') as HTMLDivElement;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSearch();
    });
  }

  private async handleSearch(): Promise<void> {
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
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error);
      }

      const data: SearchResponse = await response.json();
      this.displayResults(data, name);
    } catch (error) {
      this.showError(error instanceof Error ? error.message : '検索エラーが発生しました');
    } finally {
      this.setLoading(false);
    }
  }

  private displayResults(data: SearchResponse, searchTerm: string): void {
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

  private showError(message: string): void {
    this.errorDiv.textContent = message;
    this.errorDiv.style.display = 'block';
  }

  private hideError(): void {
    this.errorDiv.style.display = 'none';
  }

  private setLoading(loading: boolean): void {
    this.button.disabled = loading;
    this.button.textContent = loading ? '検索中...' : '検索';
  }

  private escapeHtml(unsafe: string): string {
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
