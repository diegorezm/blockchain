package models

type Transaction struct {
	Id        int64
	BlockId   int64
	Type      string
	Hash      string
	Amount    int64
	Sender    string
	Recipient string
	CreatedAt string
}
