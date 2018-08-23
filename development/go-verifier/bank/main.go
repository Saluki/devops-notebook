package bank

import (
	"fmt"

	"github.com/storozhukBM/verifier"
)

const maximalAmount int = 10000.00

// Transfer represents a bank transfer from a source account to a destination
// account with the given amount.
type Transfer struct {
	Source, Destination string
	Amount              int
}

// PerformTransfer performs a bank transfer based on the given data.
func PerformTransfer(transfer *Transfer) (bool, error) {

	verify := verifier.New()
	verify.That(transfer != nil, "Bank transfer cannot be nil")

	if verify.GetError() != nil {
		return false, verify.GetError()
	}

	verify.That(transfer.Amount > 0, "Amount must be strictly positive")
	verify.That(transfer.Amount <= maximalAmount, "Amount can't exceed the limit")
	verify.That(transfer.Source != "", "Transfer source can't be empty")
	verify.That(transfer.Destination != "", "Transfer destination can't be empty")

	if verify.GetError() != nil {
		return false, verify.GetError()
	}

	fmt.Println("Transfer data looks good,\nwe can now proceed with the transfer")
	return true, nil
}
