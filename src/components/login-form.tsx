import React, { useRef } from "react";

interface LoginFormProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm = ({ setIsLogin }: LoginFormProps) => {
  const loginUser = useRef("");

  const database = [
    //테스트 후에 삭제
    {
      username: "user1",
      password: "1234",
    },
    {
      username: "user2",
      password: "5678",
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit called");
    const { username, password } = document.forms[0];
    const userData = database.find((user) => user.username === username.value);

    if (userData) {
      if (userData.password === password.value) {
        console.log("Login sucess!!");
        setIsLogin(true);
      }
    } else {
      console.log("Login Failed!!!!!!!");
    }
  };

  return (
    <>
      <h1>login!!!!</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
};
