import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { Dispatch } from "redux";
import { addToken, removeToken } from "../stores/tokenStore";
import { connect } from "react-redux";

const cookies = new Cookies();

const loginUrl = "http://127.0.0.1:5000/api/auth/login";

interface LoginFormInterface {
  email: string;
  password: string;
}

interface JsonInterface {
  jwt_access_token: string;
  jwt_refresh_token: string;
}

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
  removeTokenLocal: () => void;
}

const HomeContainer = styled.main`
  width: 100%;
  height: 100vh;
`;

const Home = ({ userToken, addTokenLocal, removeTokenLocal }: IProps) => {
  const [isLogin, setIsLogin] = useState(false);

  const { register, getValues, handleSubmit } = useForm<LoginFormInterface>();

  const onSubmit = async () => {
    const { email, password } = getValues();
    onLogin({ email, password });
  };

  const onLogin = async ({ email, password }: LoginFormInterface) => {
    try {
      const data = {
        email,
        password,
      };
      const { jwt_access_token, jwt_refresh_token }: JsonInterface =
        await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        }).then((res: any) => {
          return res.json();
        });

      cookies.set("refresh_token", jwt_refresh_token, { sameSite: "strict" }); // refresh token 저장

      addTokenLocal({ token: `${jwt_access_token}` }); // access token 저장

      setIsLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAccessToken = () => {
    console.log(userToken);
  };

  const onLogout = () => {
    cookies.remove("refresh_token");
    removeTokenLocal();
    setIsLogin(false);
  };

  return (
    <HomeContainer>
      {isLogin ? (
        <div>
          <h1>loggedIn!!</h1>
          <button onClick={onLogout}>logout</button>
          <button onClick={checkAccessToken}>checkId!!</button>
        </div>
      ) : (
        <div>
          <h1>Login!!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Email : </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                name="email"
                required
                type="email"
                placeholder="이메일"
                autoComplete="off"
              />
            </div>
            <div>
              <label>Password : </label>
              <input
                {...register("password", {
                  required: "Email is required",
                })}
                name="password"
                required
                type="password"
                placeholder="비밀번호"
                autoComplete="off"
              />
            </div>
            <input type="submit" />
          </form>
        </div>
      )}
    </HomeContainer>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTokenLocal: (token: IParams) => dispatch(addToken(token)),
    removeTokenLocal: () => dispatch(removeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
