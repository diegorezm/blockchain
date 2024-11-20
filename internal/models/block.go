package models

type Block struct {
	Id        int64
	Previous  *Block
	Timestamp string
	Data      string
	Hash      string
	Nonce     int64
	CreatedAt string
}
