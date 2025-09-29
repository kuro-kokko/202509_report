FROM golang:1.21-alpine

WORKDIR /app

COPY . .

RUN go mod download
RUN go mod tidy

RUN go build -o main .

EXPOSE 3000

CMD ["./main"]
