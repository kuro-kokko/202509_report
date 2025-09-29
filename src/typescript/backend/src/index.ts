import express from 'express';
import cors from 'cors';
import { searchUsersByName } from './db';
import { SearchRequest, SearchResponse, ErrorResponse } from './types';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ユーザー検索
app.get('/api/search', async (req, res) => {
  try {
    const { name } = req.query as { name?: string };

    if (!name) {
      const errorResponse: ErrorResponse = { error: '検索名は必須です' };
      return res.status(400).json(errorResponse);
    }

    if (name.length < 1) {
      const errorResponse: ErrorResponse = { error: '検索名は1文字以上で入力してください' };
      return res.status(400).json(errorResponse);
    }

    // 検索処理
    const users = await searchUsersByName(name);
    
    const response: SearchResponse = {
      users,
      total: users.length
    };

    res.json(response);
  } catch (error) {
    console.error('Search error:', error);
    const errorResponse: ErrorResponse = { 
      error: error instanceof Error ? error.message : '検索エラーが発生しました' 
    };
    res.status(500).json(errorResponse);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
