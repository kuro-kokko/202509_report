package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	err := InitDB()
	if err != nil {
		log.Fatal("データベース初期化失敗:", err)
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3001"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	// ヘルスチェックエンドポイント
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// 検索エンドポイント
	router.GET("/api/search", searchHandler)

	log.Println("サーバーをポート3000で起動中...")
	router.Run(":3000")
}

// 検索リクエスト処理
func searchHandler(c *gin.Context) {
	name := c.Query("name")

	if name == "" {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: "検索名は必須です",
		})
		return
	}

	name = strings.TrimSpace(name)
	if len(name) < 1 {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: "検索名は1文字以上で入力してください",
		})
		return
	}

	users, err := SearchUsersByName(name)
	if err != nil {
		log.Printf("検索エラー: %v", err)

		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error: "検索エラーが発生しました",
		})
		return
	}

	response := SearchResponse{
		Users: users,
		Total: len(users),
	}

	c.JSON(http.StatusOK, response)
}
