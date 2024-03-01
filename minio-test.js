require('dotenv').config(); // 환경 변수를 로드하기 위해 추가
const AWS = require('aws-sdk');
const express = require('express');

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  endpoint: process.env.ENDPOINT, // MinIO 서버의 주소
  s3ForcePathStyle: true, // 이 옵션을 true로 설정해야 합니다.
  signatureVersion: 'v4'
});

const app = express();
// JSON 형태의 요청 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());

app.post('/upload', function (req, res) {
  const { content, fileName } = req.body; // 요청 본문에서 content와 fileName 추출
  const buffer = Buffer.from(content, 'utf-8'); // 문자열을 버퍼로 변환
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: buffer
  };

  s3.upload(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      res.status(500).send("String upload failed.");
    } else {
      console.log("Upload Success", data.Location);
      res.send("String uploaded successfully.");
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));