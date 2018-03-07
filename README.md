# DEV283x_assignment3
edx Introduction to NodeJs assignment 3

To test this

```
git clone https://github.com/tparicio/DEV283x_assignment3.git
cd DEV283x_assignment3
npm install
node migrate_data 100
```

You should have a mongo server running in your system in port 27017

You can check script execution into mongodb edx-course-db database and customer collection, where you should find 1000 results with this format:

```json
{
  "_id": "5aa00575f141c10e97414e2b",
  "id": "1",
  "first_name": "Ario",
  "last_name": "Noteyoung",
  "email": "anoteyoung0@nhs.uk",
  "gender": "Male",
  "ip_address": "99.5.160.227",
  "ssn": "509-86-9654",
  "credit_card": "5602256742685208",
  "bitcoin": "179BsXQkUuC6NKYNsQkdmKQKbMBPmJtEHB",
  "street_address": "0227 Kropf Court",
  "country": "United States",
  "city": "New Orleans",
  "state": "Louisiana",
  "phone": "504-981-8641"
}
```

Thanks for check this assignment
