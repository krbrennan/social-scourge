// Created for refrence purposes

let db = {
  user: [
    {
      username: 'user1',
      password: "password",
      confirmPassword: "password",
      createdAt: newDate(),
      email: 'abc@gmail.com',
      imgUrl: "https://www.google.com/whatever",
      location: 'Angola',
      userId: "eighrh4JFJ3fjj3M",
      username: "user1",
      website: 'portfolio.com'
    }
  ],
    posts: [
        {
          username:   'user',
          content: 'post content',
          createdAt: '2020-07-01!5:33:00.018Z',
          likeCount: 2,
          commentCount: 1
        }
    ],
    comments: [
      {
        username: 'user',
        postId: "ksd8sjdjjj2",
        body: "Rome is burning",
        createdAt: '2019-03-15T10:59:52.798Z'
      }
    ],
    likes: [
      {
        list: [
          "user1",
          "user2",
          "user3"
        ],
        username: 'user0',
        postId = '9JN4I3N2BB3IN'
      }
    ]. 
    notifications: [
      {
        recipient: 'user',
        sender: 'user1',
        read: 'true or false',
        postId: 'oasdjadjkKJKksjd',
        type: 'like or comment',
        createdAt: '2020-01-15T00:50:43.798Z'
      }
    ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: "sjdsjdiasjdi2kn223ln",
    email: 'user@email.com',
    username: 'user1',
    createdAt: 'date time obj to ISO string',
    imgUrl: 'yes.com',
    bio: 'lorem ipsum sit dolor amet yadda yadda',
    website: 'democracyNOW.org',
    location: 'Brussles'
  },
  likes: [
    {
      username: 'user1',
      postID: 'hsdhshd2hd2hd'
    },
    {
      username: 'user2',
      postId: 'sidsidh2dh'
    }
  ]
}