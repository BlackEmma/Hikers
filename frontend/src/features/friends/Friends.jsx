/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Modal } from '@geist-ui/core';
import { selectorUserSession } from '../main/authSlice';
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
    console.log('allFr', allFr);
  // console.log(allFr);
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getSubscribeThunk());
  //     dispatch(getFriendsThunk());
  //     // dispatch(unSubscribeThunk());
  //   }, 50);
  // }, [userSession, dispatch, state]);

  useEffect(() => {
    dispatch(getFriendsThunk());
   }, [dispatch]);

   useEffect(() => {
    if (userSession) {
      if (allFr && !Array.isArray(allFr) && num === 0) {
          console.log('filter', allFr);
          setUserFriends(allFr.friends.filter((el) => el.user_id === userSession.id && el.status === true));
          setNum(null);
        }
      // } else if (allFr && num === 0) {
      //   setUserFriends(allFr.friends.filter((el) => el.user_id === userSession.id && el.status === true));
      //   setNum(null);
      // }
    }
   }, [allFr]);

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

  // console.log(userFriends);

  if (!allFr) return <div>oops</div>;
  if (!userSession) return <div>oops</div>;

  return (
    <div
      className="friends"
      style={{
      position: 'relative',
      minHeight: '83vh',
      maxHeight: '100%',
      marginBottom: '100px'
      }}
    >
      <div className="friends-title">
        ?????? ????????????????
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
                  <div className="user-info">
                    {friend['User.city']}
                  </div>
                  <div>
                    {friend['User.favorite_cat']}
                  </div>
                  <div>
                    <img src="/images/icon/link.png" alt="email" className="icons" />
                    <a href={friend['User.link']}>{friend['User.link']}</a>
                  </div>
                  <div>
                  <img src="/images/icon/email.png" alt="email" className="icons" />
                    {friend['User.email']}
                  </div>
                </div>
                <div className="btn-group">
                  <div className="friends-btn">
                    <Grid><Button type="success" ghost auto scale={0.7} onClick={(e) => handleChat(e, friend.friend_id)}>??????????????????</Button></Grid>
                    {/* <Button onClick={handler} auto>????????????????</Button>; */}
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
                    >????????????????????
                          </Button>
                    </Grid>
                    <div>
                      {/* <Modal visible={state} onClose={(e) => closeHandler(e)}>
                        <Modal.Title>????????????????????</Modal.Title>
                        <Modal.Content>
                          <p>?????????????????????? ????????????????</p>
                        </Modal.Content>
                        <Modal.Action passive onClick={() => setState(false)}>????????????</Modal.Action>
                        <Modal.Action onClick={(e) => {
                      // e.preventDefault();
                      dispatch(unSubscribeThunk({ userId: userSession.id, friendId: friend.friend_id }));
                      setState((prev) => !prev);
                      setUserFriends((p) => p.filter((el) => el.id !== friend.id));
                       }}
                        >??????????????????????
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
