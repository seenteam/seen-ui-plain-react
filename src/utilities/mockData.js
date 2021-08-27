export const users = {
    "data": {
        "id": null,
        "type": "users",
        "attributes": {
            "users": [
                {
                "id": 1,
                "username": "test1",
                "first_name": "firstname",
                "last_name": "lastname",
                "email": "example@example.com",
                "phone_number": "999-999-9999",
                "birthday": "1-11-1990",
                "created_at": '8-26-2021',
                "updated_at": '8-26-2021'
                },
                {
                "id": 2,
                "username": "exaplename",
                "first_name": "exampleperson",
                "last_name": "examplelast",
                "email": "example2@example.com",
                "phone_number": "999-999-9999",
                "birthday": "1-11-1990",
                "created_at": '8-26-2021',
                "updated_at": '8-26-2021'
                }
            ]
        }
    }
}

export const posts = [
  {
    "data": {
        "id": "1",
        "type": "post",
        "attributes": {
            "id": 1,
            "user_first_name": "first",
            "user_last_name": "last",
            "user_id": "1",
            "content": "This is my post!"
        }
    }
  },
  {
    "data": {
        "id": "2",
        "type": "post",
        "attributes": {
            "id": 2,
            "user_first_name": "first",
            "user_last_name": "last",
            "user_id": "2",
            "content": "Test number two!"
        }
    }
  }
];
