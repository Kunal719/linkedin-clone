/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostModal from './PostModal';
import { connect } from 'react-redux';
import { getArticlesAPI } from '../actions';
import Youtube from 'react-youtube';

const Main = (props) => {
  const [showModal, setShowModal] = useState('close');

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case 'open':
        setShowModal('close');
        break;
      case 'close':
        setShowModal('open');
        break;
      default:
        setShowModal('close');
        break;
    }
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <>
      {props.articles.length === 0 ? (
        <p>There are no articles at the moment</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt='' />
              ) : (
                <img src='/images/user.svg' alt='' />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src='/images/picture.png' className='post-icon' alt='' />
                <span>Photo</span>
              </button>

              <button>
                <img src='/images/video.png' className='post-icon' alt='' />
                <span>Video</span>
              </button>

              <button>
                <img src='/images/planner.png' className='post-icon' alt='' />
                <span>Event</span>
              </button>

              <button>
                <img src='/images/newspaper.png' className='post-icon' alt='' />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <img src='/images/loading.gif' alt='' />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt='' />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src='/images/ellipses.svg' alt='' />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <Youtube opts={opts} videoId={article.video} />
                      ) : (
                        article.sharedImg && (
                          <img src={article.sharedImg} alt='' />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src='/images/like.png' alt='' />
                        <img src='images/clapping.png' alt='' />
                        <span>82</span>
                      </button>
                    </li>
                    <li>
                      <span>{article.comments} comments</span>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src='/images/like-button.png' alt='' />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src='/images/comment.png' alt='' />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src='/images/send.png' alt='' />
                      <span>Send</span>
                    </button>
                    <button>
                      <img src='/images/share.png' alt='' />
                      <span>Share</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    /* align-items: center; */
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      font-weight: 600;
      img {
        margin-right: 7px;
        width: 20px;
        height: 20px;
      }
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        align-items: center;
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 15px;
      margin-bottom: -10px;

      button {
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 100%;
      cursor: pointer;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  justify-content: space-between;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      span {
        margin-left: 4px;
        color: rgba(0, 0, 0, 0.6);
      }
    }

    &:nth-child(2) {
      margin-top: 3px;
      color: rgba(0, 0, 0, 0.6);
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  img {
    &:first-child {
      width: 20px;
    }
    &:nth-child(2) {
      width: 15px;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  button {
    background: transparent;
    border: none;
    align-items: center;
    display: inline-flex;

    span {
      color: rgba(0, 0, 0, 0.7);
      margin-left: 5px;
    }

    &:first-child {
      img {
        position: relative;
        top: -3.8px;
      }
    }

    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.05);
      /* border-radius: 20px; */
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
