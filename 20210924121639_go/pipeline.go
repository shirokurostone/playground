package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// 連番を生成する
func generator(
	ctx context.Context,
	wg *sync.WaitGroup,
) <-chan int {

	output := make(chan int)
	wg.Add(1)
	go func() {
		defer wg.Done()
		defer close(output)
		i := 0
		for {
			select {
			case output <- i:
				i++
			case <-ctx.Done():
				return
			}
		}
	}()

	return output
}

// prefixとsuffixを付与して文字列として出力する
func decorator(
	ctx context.Context,
	wg *sync.WaitGroup,
	input <-chan int,
	prefix string,
	suffix string,
) <-chan string {
	output := make(chan string)

	wg.Add(1)
	go func() {
		defer wg.Done()
		defer close(output)
		for {
			select {
			case n := <-input:
				select {
				case output <- (prefix + fmt.Sprintf("%d", n) + suffix):
				case <-ctx.Done():
					return
				}
			case <-ctx.Done():
				return
			}
		}
	}()

	return output
}

// 複数のchannelをマージして出力する
func merger(
	ctx context.Context,
	wg *sync.WaitGroup,
	inputs ...<-chan string,
) <-chan string {
	output := make(chan string)
	var w sync.WaitGroup // マージ用goroutineの終了を待つためのWaitGroup

	// マージ用goroutineを起動
	for _, input := range inputs {
		w.Add(1)
		wg.Add(1)
		go func(input <-chan string) {
			defer w.Done()
			defer wg.Done()
			for {
				select {
				case s := <-input:
					select {
					case output <- s:
					case <-ctx.Done():
						return
					}
				case <-ctx.Done():
					return
				}
			}
		}(input)
	}

	// マージ用goroutineの終了後、outputをcloseする
	wg.Add(1)
	go func() {
		defer close(output)
		defer wg.Done()
		w.Wait()
	}()

	return output
}

// 標準出力に出力する
func printer(
	ctx context.Context,
	wg *sync.WaitGroup,
	input <-chan string,
) {

	wg.Add(1)
	go func() {
		defer wg.Done()

		for {
			select {
			case s, ok := <-input:
				if ok {
					fmt.Println(s)
				}
			case <-ctx.Done():
				return
			}
		}
	}()
}

func main() {
	var wg sync.WaitGroup                                                   // すべてのgoroutineの終了を待つためのWaitGroup
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second) // 3s後に停止
	defer cancel()

	g := generator(ctx, &wg)
	d1 := decorator(ctx, &wg, g, "d1 *", "*")
	d2 := decorator(ctx, &wg, g, "d2 *", "*")
	d3 := decorator(ctx, &wg, g, "d3 *", "*")
	printer(ctx, &wg, merger(ctx, &wg, d1, d2, d3))

	wg.Wait() // 全goroutineの終了を待つ
}
