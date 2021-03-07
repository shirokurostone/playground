package main

import (
	"context"
	"fmt"
	"time"
)

func worker(ctx context.Context, id int, queue chan int) {
	for {
		select {
		case n := <-queue:
			fmt.Printf("worker%d: %d\n", id, n*2)
		case _ = <-ctx.Done():
			fmt.Printf("worker%d: done\n", id)
			return
		}
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	queue := make(chan int, 1)
	go worker(ctx, 0, queue)
	go worker(ctx, 1, queue)
	for i := 0; i < 5; i++ {
		queue <- i
		time.Sleep(1 * time.Second)
	}
	time.Sleep(10 * time.Second)
}
