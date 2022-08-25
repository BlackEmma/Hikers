/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Modal } from '@geist-ui/core';
import { selectorUserSession } from '../main/authSlice';
import { getSubscribeThunk } from '../profile/profileSlice';
import { getFriendsThunk, unSubscribeThunk, selectorFriends } from './friendsSlice';
import { newChat } from '../chat/chatSlice';

import './Friends.css';

function Friends() {
  const [state, setState] = useState(false);
//   const handler = () => setState(true);
//   const closeHandler = (event) => {
//   setState(false);
// };

  const [num, setNum] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allFr = useSelector(selectorFriends);
  const userSession = useSelector(selectorUserSession);
  const [userFriends, setUserFriends] = useState();
  console.log(userFriends, 'userFriends');
  // console.log(allFr);
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getSubscribeThunk());
  //     dispatch(getFriendsThunk());
  //     // dispatch(unSubscribeThunk());
  //   }, 50);
  // }, [userSession, dispatch, state]);
  useEffect(() => {
    if (allFr && num === 0) {
   setUserFriends(allFr && allFr.friends.filter((el) => el.user_id === userSession.id && el.status === true));
   setNum(null);
    }
   }, [allFr, num]);

  function handleChat(e, id) {
    e.preventDefault();

    const user = {
      user_id: userSession.id,
      friend_id: id
    };

    dispatch(newChat(user));
    setTimeout(() => {
      navigate(`/profile/${userSession.id}/chat`);
    }, 1000);
  }

  if (!allFr) return <div>oops</div>;
  if (!userSession) return <div>oops</div>;

  return (
    <div className="friends">
      <div className="friends-title">
        Мои подписки
      </div>
      <div>
        {
          // userSession && allFr && allFr.friends && allFr.friends.length && allFr.friends.map((friend) => (friend.user_id === userSession.id && friend.status === true) &&
          allFr && userFriends && userFriends.map((friend) => (
            <div key={friend.id} className="friend">
              <div>
                <img src={`/images/${friend['User.ava']}`} alt="img" id="ava-img" />
                {/* <img src={ava} alt="img" id="ava-img" /> */}
                {/* <img src={ava} alt="img" /> */}
              </div>
              <div className="info-btn">
                <div className="friends-info">
                  <div>
                    {friend['User.user_name']}
                  </div>
                  <div>
                    {friend['User.city']}
                  </div>
                  <div>
                  <a href={friend['User.link']}>{friend['User.link']}</a>
                    {/* {friend['User.link']} */}
                  </div>
                  <div>
                    {friend['User.favorite_cat']}
                  </div>
                  <div>
                    {friend['User.email']}
                  </div>
                </div>
                <div className="btn-group">
                  <div className="friends-btn">
                    <Grid><Button type="success" ghost auto scale={0.7} onClick={(e) => handleChat(e, friend.friend_id)}>Сообщение</Button></Grid>
                    {/* <Button onClick={handler} auto>Отпиться</Button>; */}
                  </div>
                  <div className="friends-btn">
                    <Grid><Button
                      type="secondary"
                      ghost
                      auto
                      scale={0.7}
                      onClick={(e) => {
                      e.preventDefault();
                      dispatch(unSubscribeThunk({ userId: userSession.id, friendId: friend.friend_id }));
                      setState((prev) => !prev);
                      setUserFriends((p) => p.filter((el) => el.id !== friend.id));
                    }}
                    >Отписаться
                          </Button>
                    </Grid>
                    <div>
                      {/* <Modal visible={state} onClose={(e) => closeHandler(e)}>
                        <Modal.Title>Отписаться</Modal.Title>
                        <Modal.Content>
                          <p>Подтвердите действие</p>
                        </Modal.Content>
                        <Modal.Action passive onClick={() => setState(false)}>Отмена</Modal.Action>
                        <Modal.Action onClick={(e) => {
                      // e.preventDefault();
                      dispatch(unSubscribeThunk({ userId: userSession.id, friendId: friend.friend_id }));
                      setState((prev) => !prev);
                      setUserFriends((p) => p.filter((el) => el.id !== friend.id));
                       }}
                        >Подтвердить
                        </Modal.Action>
                      </Modal> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Friends;

//  /images/progile/1.png
