curl -X POST http://localhost:3000/upload \
-H "Content-Type: application/json" \
-d '{"content": "여기에 업로드할 문자열을 입력하세요", "fileName": "example.txt"}'
