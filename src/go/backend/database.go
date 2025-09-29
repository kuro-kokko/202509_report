package main

import (
	"database/sql"
	"fmt"
	"os"
	"strings"

	_ "github.com/lib/pq"
)

var DB *sql.DB

// データベース接続初期化
func InitDB() error {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgresql://user:password@db:5432/userdb?sslmode=disable"
	}

	var err error
	DB, err = sql.Open("postgres", dbURL)
	if err != nil {
		return fmt.Errorf("データベース接続エラー: %v", err)
	}

	err = DB.Ping()
	if err != nil {
		return fmt.Errorf("データベースPingエラー: %v", err)
	}

	fmt.Println("データベース接続成功")
	return nil
}

// 名前でユーザーを検索
func SearchUsersByName(name string) ([]User, error) {
	name = strings.TrimSpace(name)
	if name == "" {
		return nil, fmt.Errorf("検索名が空です")
	}

	query := `
		SELECT id, name, age, del_flg 
		FROM users 
		WHERE name ILIKE $1 AND del_flg = false
		ORDER BY name, id
	`

	rows, err := DB.Query(query, "%"+name+"%")
	if err != nil {
		return nil, fmt.Errorf("クエリ実行エラー: %v", err)
	}
	defer rows.Close()

	var users []User

	// 空のスライスを初期化（nilではなく空の配列をJSONで返すため）
	users = make([]User, 0)

	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Age, &user.DelFlg)
		if err != nil {
			return nil, fmt.Errorf("行スキャンエラー: %v", err)
		}
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("行処理エラー: %v", err)
	}

	return users, nil
}
