package main

import (
	"fmt"
	"time"
)

func worker(id int, queue chan int, timeout time.Duration) {
	c := time.After(timeout)
	for {
		select {
		case n := <-queue:
			fmt.Printf("worker%d: %d\n", id, n*2)
		case <-c:
			fmt.Printf("worker%d: timeout\n", id)
			return
		}
	}
}

func main() {
	queue := make(chan int, 10)
	go worker(0, queue, 5*time.Second)
	go worker(1, queue, 5*time.Second)
	for i := 0; i < 10; i++ {
		queue <- i
		time.Sleep(1 * time.Second)
	}
}
