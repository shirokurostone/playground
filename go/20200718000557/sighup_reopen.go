package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"
)

type Logger struct {
	path  string
	file  *os.File
	mutex sync.RWMutex
}

func NewLogger(path string) (*Logger, error) {
	l := Logger{path: path}
	if err := l.open(); err != nil {
		return nil, err
	}
	return &l, nil
}

func (l *Logger) Printf(format string, a ...interface{}) error {
	l.mutex.RLock()
	defer l.mutex.RUnlock()
	_, err := fmt.Fprintf(l.file, format, a...)
	return err
}

func (l *Logger) Reopen() error {
	l.mutex.Lock()
	defer l.mutex.Unlock()

	if err := l.close(); err != nil {
		return err
	}
	if err := l.open(); err != nil {
		return err
	}

	return nil
}

func (l *Logger) open() error {
	if l.file != nil {
		return nil
	}

	file, err := os.OpenFile(l.path, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	if err != nil {
		return err
	}

	l.file = file
	return nil
}

func (l *Logger) close() error {
	if l.file == nil {
		return nil
	}
	if err := l.file.Close(); err != nil {
		return err
	}
	l.file = nil
	return nil
}

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, syscall.SIGHUP)

	logger, err := NewLogger("./out.log")
	if err != nil {
		log.Fatal(err)
	}

	go func() {
		for _ = range c {
			logger.Printf("reopen\n")
			if err := logger.Reopen(); err != nil {
				log.Fatal(err)
			}
		}
	}()

	for {
		logger.Printf(time.Now().Format("2006-01-02 15:04:05\n"))
		time.Sleep(1 * time.Second)
	}
}
