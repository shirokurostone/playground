package main

import (
	"context"
	"fmt"
	"time"
)

func parent(ctx context.Context) {
	ctx2, cancel := context.WithTimeout(ctx, time.Second)
	defer cancel()
	fmt.Printf("Result: %#v\n", child(ctx2))

	ctx3, cancel := context.WithCancel(ctx)
	defer cancel()
	time.AfterFunc(time.Second, func() { cancel() })
	fmt.Printf("Result: %#v\n", child(ctx3))
}

func child(ctx context.Context) error {
	deadline, ok := ctx.Deadline()
	fmt.Printf("Deadline(): %v, %v\n", deadline, ok)

	select {
	case <-ctx.Done():
		return ctx.Err()
	}

	return nil
}

func main() {
	parent(context.Background())
}
