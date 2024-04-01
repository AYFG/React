import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducer/user";

export const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹 <br />0
        </div>,
        <div key="followings">
          팔로워 <br />0
        </div>,
        <div key="follwers">
          팔로워 <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>ZC</Avatar>} title="Zerocho"></Card.Meta>
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};
