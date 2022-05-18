# Node Api Exam

## Getting started

```
npm install
npm start
```

## build with docker

```
npm install
npm run build
docker build -t exam-api:latest .
```

## run with docker

```
 docker run -d \
   -p 8443:8443 \
   -e EXAM_DB_USERNAME=${TODO} \
   -e EXAM_DB_PASSWORD=${TODO} \
   -e EXAM_DB_HOSTNAME=${TODO} \
   exam-api
```
