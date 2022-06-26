package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"net"
	"time"
)

func main() {

	parent, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	ctx, cancel := context.WithTimeout(parent, 1*time.Second)
	defer cancel()

	var d net.Dialer
	conn, err := d.DialContext(ctx, "tcp", "127.0.0.1:8000")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	if deadline, ok := ctx.Deadline(); ok {
		if err = conn.SetDeadline(deadline); err != nil {
			log.Fatal(err)
		}
	}

	if _, err := fmt.Fprintf(conn, "GET / HTTP1.0\r\n\r\n"); err != nil {
		log.Fatal(err)
	}

	reader := bufio.NewReader(conn)
	line, err := reader.ReadString('\n')
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", line)

}
