package main

import (
	"context"
	"fmt"
)

type key1 struct{}
type key2 struct{}
type key3 struct{}

func main() {
	ctx := context.Background()
	ctx = context.WithValue(ctx, key1{}, "value1")
	ctx = context.WithValue(ctx, key2{}, "value2")

	fmt.Println(ctx.Value(key1{}))
	fmt.Println(ctx.Value(key2{}))
	fmt.Println(ctx.Value(key3{}))
}
