// VERIFIER LIBRARY
// ----------------
// This code provides a basic "bank" library scenario that uses defensive
// programming concepts using the verifier library. To use this program,
// the following dependencies is required: github.com/storozhukBM/verifier
//
// You can leave the defaults to see the program succeed or use the CLI
// like "go run main.go --src=A --dst=B --amount=8" to see the limits.

package main

import (
	"flag"
	"fmt"

	"./bank"
)

func main() {

	source := flag.String("src", "Account A", "src")
	destination := flag.String("dst", "Account A", "dst")
	amount := flag.Int("amount", 8, "amount")

	flag.Parse()

	operation := bank.Transfer{
		Source:      *source,
		Destination: *destination,
		Amount:      *amount,
	}

	_, err := bank.PerformTransfer(&operation)

	if err != nil {
		fmt.Println("Transfer went not well")
		panic(err)
	}

}
