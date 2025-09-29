package main

type User struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Age    int    `json:"age"`
	DelFlg bool   `json:"del_flg"`
}

type SearchResponse struct {
	Users []User `json:"users"`
	Total int    `json:"total"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
