package main

import (
	"fmt"
	"log"
	"net/http"
	"syscall/js"
)

func main() {

	// Basic example, we just call a function and display
	// the return in the browser console
	greeting := buildName("John", "Doe")
	fmt.Println(greeting)

	// Interacting with the JS environment to get the location
	// "href" property of our browser
	href := js.Global().Get("location").Get("href")
	fmt.Printf("Location 'href' is %s\n", href)

	// Retrieve resources with a HTTP GET request, watch out
	// for CORS settins, will not work otherwise on other domains
	response, err := http.Get("http://localhost:8080/captures/ipv4_fragments.pcap")
	if err != nil {
		log.Fatal(err)
	}
	if response.StatusCode != http.StatusOK {
		log.Fatal("HTTP status code not OK")
	}
	fmt.Printf("Retrieved a file using GET with content length %d\n", response.ContentLength)

	// Working with JS callbacks to display an alert when clicking
	// on the button with ID "otherButton"
	otherBtn := js.Global().Get("document").Call("getElementById", "otherButton")
	otherBtn.Call("addEventListener", "click", js.NewCallback(func(args []js.Value) {
		js.Global().Get("window").Call("alert", "WASM code says...")
	}))

	// If we omit this element when using "long-running" code (involving callbacks
	// for example) the program will exit and we will get a "Go program has already exited"
	// error when trying to trigger a callback
	select {}
}

func buildName(firstName, lastName string) string {
	return fmt.Sprintf("Hello, my name is %s %s. Nice to meet you!", firstName, lastName)
}
