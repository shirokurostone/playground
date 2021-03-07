package main

import (
	"fmt"
	"time"
)

func worker(id int, queue chan int, done chan struct{}) {
	for {
		select {
		case n := <-queue:
			fmt.Printf("worker%d: %d\n", id, n*2)
		case _ = <-done:
			fmt.Printf("worker%d: done\n", id)
			return
		}
	}
}

func main() {
	done := make(chan struct{}, 1)
	queue := make(chan int, 3)
	go worker(0, queue, done)
	go worker(1, queue, done)
	for i := 0; i < 10; i++ {
		queue <- i
		time.Sleep(1 * time.Second)
	}
	close(done)
	time.Sleep(3 * time.Second)
}
